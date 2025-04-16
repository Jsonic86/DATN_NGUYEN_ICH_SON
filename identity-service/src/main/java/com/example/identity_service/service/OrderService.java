package com.example.identity_service.service;

import com.example.identity_service.dto.request.OrderRequest;
import com.example.identity_service.dto.response.OrderResponse;
import com.example.identity_service.entity.Customer;
import com.example.identity_service.entity.Order;
import com.example.identity_service.entity.OrderDetail;
import com.example.identity_service.entity.Product;
import com.example.identity_service.enums.OrderStatus;

import com.example.identity_service.exception.AppException;
import com.example.identity_service.exception.ErrorCode;
import com.example.identity_service.mapper.OrderMapper;
import com.example.identity_service.repository.CustomerRepository;
import com.example.identity_service.repository.OrderRepository;
import com.example.identity_service.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
   @Autowired private OrderRepository orderRepository;

   @Autowired private ProductRepository productRepository;
   @Autowired private CustomerRepository customerRepository;
   @Autowired private OrderMapper  orderMapper;
   public OrderResponse createOrder(OrderRequest dto) {
     Customer customer = customerRepository.findById(dto.getCustomerId()).orElseThrow(
             ()-> new AppException(ErrorCode.USER_NOT_EXISTED)
     );
      Order order = Order.builder()
              .customer(customer)
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

   public List<OrderResponse> getAllOrders() {
       return orderRepository.findAll().stream().map(orderMapper::toOrderResponse).collect(Collectors.toList());
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
