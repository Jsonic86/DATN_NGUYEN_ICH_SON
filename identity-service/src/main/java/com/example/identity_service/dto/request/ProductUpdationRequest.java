package com.example.identity_service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductUpdationRequest {
    Integer productId;

    Long categoryId;

    String productName;

    String description;

    BigDecimal price;

    Integer stockQuantity;

    MultipartFile image;
}
