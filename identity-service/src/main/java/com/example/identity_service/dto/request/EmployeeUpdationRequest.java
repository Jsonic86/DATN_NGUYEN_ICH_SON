package com.example.identity_service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmployeeUpdationRequest {
    Integer employeeId;

    String userId;

    String email;

    String phoneNumber;

    Set<Integer> orderId;
}
