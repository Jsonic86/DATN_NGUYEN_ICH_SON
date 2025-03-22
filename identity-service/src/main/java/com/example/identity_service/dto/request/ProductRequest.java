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
public class ProductRequest {
    Integer productId;
    Integer categoryId;

    String productName;

    String description;

    BigDecimal price;

    Integer stockQuantity;

    String imageUrl;

    MultipartFile image;
}


