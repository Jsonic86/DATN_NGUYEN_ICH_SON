package com.example.identity_service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SupplierUpdationRequest {
    Long id;

    String supplierName;

    String contactPerson;

    String phone;

    String email;

    String address;

    LocalDateTime createdAt;
}
