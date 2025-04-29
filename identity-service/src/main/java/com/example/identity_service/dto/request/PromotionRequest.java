package com.example.identity_service.dto.request;

import com.example.identity_service.enums.PromotionStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PromotionRequest {
     String name; // Tên chương trình giảm giá

     String description; // Mô tả chương trình

     BigDecimal discountPercent; // % giảm giá (nếu có)

     BigDecimal discountAmount; // Hoặc giảm số tiền cố định

     LocalDate startDate; // Ngày bắt đầu

     LocalDate endDate; // Ngày kết thúc

     PromotionStatus status; // ACTIVE, INACTIVE, CANCELLED
}
