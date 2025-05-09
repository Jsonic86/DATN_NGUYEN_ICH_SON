package com.example.identity_service.service;

import com.example.identity_service.dto.request.CustomerRequest;
import com.example.identity_service.dto.request.CustomerUpdationRequest;
import com.example.identity_service.dto.request.GetRevenueRequest;
import com.example.identity_service.dto.request.OrderRequest;
import com.example.identity_service.dto.response.OrderResponse;
import com.example.identity_service.entity.*;
import com.example.identity_service.enums.OrderStatus;

import com.example.identity_service.exception.AppException;
import com.example.identity_service.exception.ErrorCode;
import com.example.identity_service.mapper.CustomerMapper;
import com.example.identity_service.mapper.OrderMapper;
import com.example.identity_service.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class OrderService {
   @Autowired private OrderRepository orderRepository;

   @Autowired private ProductRepository productRepository;
   @Autowired private CustomerRepository customerRepository;
    @Autowired private PaymentRepository paymentRepository;
    @Autowired private ShipmentRepository shipmentRepository;
    @Autowired
    private UserRepositoy userRepositoy;
   @Autowired private OrderMapper  orderMapper;
   @Autowired private CustomerService customerService;
   @Autowired private CustomerMapper customerMapper;

    @Transactional
    public OrderResponse createOrder(OrderRequest dto) {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();

        User user = userRepositoy.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Customer customer = user.getCustomer();

        if (customer == null) {
            // Tạo mới customer
            Customer newCustomer = new Customer();
            newCustomer.setEmail(dto.getBill().getEmail());
            newCustomer.setPhoneNumber(dto.getBill().getPhoneNumber());
            newCustomer.setAddress(dto.getBill().getAddress());
            newCustomer.setNote(dto.getBill().getNote());

            customer = customerRepository.save(newCustomer);
            user.setCustomer(customer);
            userRepositoy.save(user); // Gán lại customer cho user
        } else {
            // Cập nhật thông tin customer hiện có (đừng tạo mới)
            customer.setEmail(dto.getBill().getEmail());
            customer.setPhoneNumber(dto.getBill().getPhoneNumber());
            customer.setAddress(dto.getBill().getAddress());
            customer.setNote(dto.getBill().getNote());

            customerRepository.save(customer);
        }

        // Tạo shipment address liên kết với customer
        ShipmentAddress shipmentAddress = ShipmentAddress.builder()
                .addressLine(dto.getShipment().getAddress())
                .phone(dto.getShipment().getPhoneNumber())
                .recipientName(dto.getShipment().getName())
                .customer(customer)
                .build();

        shipmentRepository.save(shipmentAddress); // ✅ Bây giờ không chết nữa

        // Tạo Order
        Order order = Order.builder()
                .customer(customer)
                .employee(null)
                .shipmentAddress(shipmentAddress)
                .status(OrderStatus.CHỜ_XỬ_LÝ)
                .build();

        if (dto.getItems() == null || dto.getItems().isEmpty()) {
            throw new AppException(ErrorCode.ORDER_ITEM_EMPTY);
        }

        List<OrderDetail> details = dto.getItems().stream().map(itemDto -> {
            Product product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));

            return OrderDetail.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemDto.getQuantity())
                    .unitPrice(product.getPrice())
                    .build();
        }).collect(Collectors.toList());

        order.setOrderDetails(details);
        order.calculateTotalAmount();

        // Lưu order
        Order savedOrder = orderRepository.save(order);

        // Lưu payment
        Payment payment = Payment.builder()
                .paymentMethod(dto.getPayment().getPaymentMethod())
                .paymentStatus(dto.getPayment().getPaymentStatus())
                .order(savedOrder)
                .build();

        paymentRepository.save(payment);

        // Gán lại payment cho order
        savedOrder.setPayment(payment);
        orderRepository.save(savedOrder);

        return orderMapper.toOrderResponse(savedOrder);
    }

   public Page<Order> getAllOrders(Pageable pageable) {
       try {
           Page<Order> orders = orderRepository.findAll(pageable);
           return orders;
       } catch (Exception e) {
           e.printStackTrace();
           return Page.empty();
       }
   }
    public Page<Order> getAllOrdersByCustomerId(Integer customerId,Pageable pageable) {
        try {
            Customer customer = customerRepository.findById(customerId).orElseThrow(
                    () -> new AppException(ErrorCode.USER_NOT_EXISTED)
            );
            Page<Order> orders = orderRepository.findByCustomer(customer,pageable);
            return orders;
        } catch (Exception e) {
            e.printStackTrace();
            return Page.empty();
        }
    }
    public Order getOrderDetail(Integer orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order == null) {
            return null;
        }
        else return order;
    }
   public OrderResponse updateStatus(Integer id , OrderStatus status) {
       Order order = orderRepository.findById(id).orElseThrow(
               ()-> new AppException(ErrorCode.ORDER_ITEM_EMPTY)
       );
       order.setStatus(status);
       orderRepository.save(order);
       return orderMapper.toOrderResponse(order);
   }

    public List<BigDecimal> getRevenueByMonth(int year) {
        List<BigDecimal> getRevenueByMonth = new ArrayList<>();

        for (int i = 1; i <= 12; i++) {
            LocalDate startOfMonth = LocalDate.of(year, i, 1);
            LocalDate endOfMonth = startOfMonth.withDayOfMonth(startOfMonth.lengthOfMonth());

            BigDecimal monthlyRevenue = orderRepository.getTotalRevenueBetween(
                    startOfMonth.atStartOfDay(),
                    endOfMonth.plusDays(1).atStartOfDay().minusSeconds(1)
            );

            getRevenueByMonth.add(monthlyRevenue);
        }

        return getRevenueByMonth;
    }

}
