package com.example.identity_service.dto.response;

import com.example.identity_service.entity.Order;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmployeeResponse {
    Integer employeeId;

    String email;

    String phoneNumber;

    Set<Order> orderId;
}
