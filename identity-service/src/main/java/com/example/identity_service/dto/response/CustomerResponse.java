package com.example.identity_service.dto.response;

import com.example.identity_service.entity.Order;
import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerResponse {
    Integer customerId;

    String email;

    String phoneNumber;

    String address;

    String note;
}
