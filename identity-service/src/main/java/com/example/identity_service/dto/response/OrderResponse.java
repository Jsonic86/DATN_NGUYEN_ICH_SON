package com.example.identity_service.dto.response;


import com.example.identity_service.entity.Customer;
import com.example.identity_service.entity.Employee;
import com.example.identity_service.entity.OrderDetail;
import com.example.identity_service.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
    Integer orderId;

    Integer customerId;

    LocalDateTime orderDate;

    BigDecimal totalAmount;

    OrderStatus status;

    List<OrderDetail> orderDetails;
}
