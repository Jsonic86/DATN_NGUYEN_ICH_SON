package com.example.identity_service.dto.request;

import com.example.identity_service.entity.Order;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerUpdationRequest {
    Integer customerId;

    String userId;

    String email;

    String phoneNumber;

    String address;

    String note;

    Set<Integer> orderId;
}
