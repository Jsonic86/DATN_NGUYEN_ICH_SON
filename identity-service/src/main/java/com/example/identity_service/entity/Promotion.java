package com.example.identity_service.entity;

import com.example.identity_service.enums.PromotionStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "promotions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long promotionId;

    private String name; // Tên chương trình giảm giá

    private String description; // Mô tả chương trình

    private BigDecimal discountPercent; // % giảm giá (nếu có)

    private BigDecimal discountAmount; // Hoặc giảm số tiền cố định

    private LocalDate startDate; // Ngày bắt đầu

    private LocalDate endDate; // Ngày kết thúc

    @Enumerated(EnumType.STRING)
    private PromotionStatus status; // ACTIVE, INACTIVE, CANCELLED

    // Nếu muốn từ Promotion lấy ngược lại danh sách Products:
    @OneToMany(mappedBy = "promotion")
    private List<Product> products;
}