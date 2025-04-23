package com.example.identity_service.service;

import com.example.identity_service.dto.request.CustomerRequest;
import com.example.identity_service.dto.request.CustomerUpdationRequest;
import com.example.identity_service.dto.request.OrderRequest;
import com.example.identity_service.dto.response.OrderResponse;
import com.example.identity_service.entity.*;
import com.example.identity_service.enums.OrderStatus;

import com.example.identity_service.exception.AppException;
import com.example.identity_service.exception.ErrorCode;
import com.example.identity_service.mapper.CustomerMapper;
import com.example.identity_service.mapper.OrderMapper;
import com.example.identity_service.repository.CustomerRepository;
import com.example.identity_service.repository.OrderRepository;
import com.example.identity_service.repository.ProductRepository;
import com.example.identity_service.repository.UserRepositoy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
   @Autowired private OrderRepository orderRepository;

   @Autowired private ProductRepository productRepository;
   @Autowired private CustomerRepository customerRepository;
    @Autowired
    private UserRepositoy userRepositoy;
   @Autowired private OrderMapper  orderMapper;
   @Autowired private CustomerService customerService;
   @Autowired private CustomerMapper customerMapper;
   public OrderResponse createOrder(OrderRequest dto) {
       var context = SecurityContextHolder.getContext();
       String name = context.getAuthentication().getName();
       User userGet = userRepositoy.findByUsername(name).orElseThrow(
               () -> new AppException(ErrorCode.USER_NOT_EXISTED)
       );
       CustomerRequest customerRequest = new CustomerRequest();
       CustomerUpdationRequest customerUpdate = new CustomerUpdationRequest();
       Customer insertCustomer = new Customer();
       if (userGet.getCustomer() == null) {
           // Tạo mới customer
           customerRequest.setEmail(dto.getShipment().getEmail());
           customerRequest.setPhoneNumber(dto.getShipment().getPhoneNumber());
           customerRequest.setUserId(userGet.getId());
           customerRequest.setAddress(dto.getShipment().getAddress());
           customerRequest.setNote(dto.getShipment().getNote());



           // Gán customer mới tạo vào user và lưu lại user
           Customer newCustomer = customerMapper.toCustomer(customerRequest);
           userGet.setCustomer(newCustomer);
           insertCustomer =  customerRepository.save(newCustomer);
           userRepositoy.save(userGet); // Cập nhật vào DB
       } else {
           // Cập nhật customer hiện có
           customerUpdate.setCustomerId(userGet.getCustomer().getCustomerId());
           customerUpdate.setEmail(dto.getShipment().getEmail());
           customerUpdate.setPhoneNumber(dto.getShipment().getPhoneNumber());
           customerUpdate.setUserId(userGet.getId());
           customerUpdate.setAddress(dto.getShipment().getAddress());
           customerUpdate.setNote(dto.getShipment().getNote());

           customerService.updateCustomer(customerUpdate);

           insertCustomer = customerMapper.updateCustomer(customerUpdate, new Customer());
       }
      Order order = Order.builder()
              .customer(insertCustomer)
              .employee(null)
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
       orderRepository.save(order);
       return orderMapper.toOrderResponse(order) ;
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

   public OrderResponse updateStatus(Integer id , OrderStatus status) {
       Order order = orderRepository.findById(id).orElseThrow(
               ()-> new AppException(ErrorCode.ORDER_ITEM_EMPTY)
       );
       order.setStatus(status);
       orderRepository.save(order);
       return orderMapper.toOrderResponse(order);
   }
}
