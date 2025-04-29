package com.example.identity_service.entity;

import com.example.identity_service.entity.Category;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    Integer productId;

//    @ManyToOne
//    @JoinColumn(name = "category_id", nullable = false, foreignKey = @ForeignKey(name = "fk_products_categories"))
//    Category category;

    @Column(name = "product_name", nullable = false, length = 255)
    String productName;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false, foreignKey = @ForeignKey(name = "fk_products_categories"))
    Category category;

    @Column(columnDefinition = "TEXT")
    String description;

    @Column(nullable = false, precision = 10, scale = 2)
    BigDecimal price;

    @Column(nullable = false)
    Integer stockQuantity;

    @Column(name = "image_url", length = 255)
    String imageUrl;


    @Column(name = "created_at", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "promotion_id")
    private Promotion promotion;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public String getCategoryName() {
        return category != null ? category.getCategoryName() : null;
    }
}
