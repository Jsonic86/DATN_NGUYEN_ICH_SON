package com.example.identity_service.dto.response;

import com.example.identity_service.entity.Product;
import com.example.identity_service.entity.Supplier;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductSupplierResponse {
    Long id;

    Integer productId;

    Long supplierId;

    BigDecimal supplyPrice;

    LocalDateTime lastSupplyDate;
}
