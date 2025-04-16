package com.example.identity_service.entity;

import com.example.identity_service.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer orderId;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false, foreignKey = @ForeignKey(name = "fk_orders_customers"))
    Customer customer;

    @ManyToOne
    @JoinColumn(name = "employee_id", foreignKey = @ForeignKey(name = "fk_orders_employees"))
    Employee employee;

    @Column(name = "order_date", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    LocalDateTime orderDate;

    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "ENUM('CHỜ_XỬ_LÝ', 'ĐANG_GIAO', 'HOÀN_THÀNH', 'ĐÃ_HỦY') DEFAULT 'CHỜ_XỬ_LÝ'")
    OrderStatus status;

    // ✅ One Order → Many OrderDetails
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    List<OrderDetail> orderDetails;

    @PrePersist
    protected void onCreate() {
        orderDate = LocalDateTime.now();
        calculateTotalAmount(); // Tự động tính tổng tiền khi tạo
    }

    public void calculateTotalAmount() {
        if (orderDetails == null || orderDetails.isEmpty()) {
            totalAmount = BigDecimal.ZERO;
        } else {
            totalAmount = orderDetails.stream()
                    .map(item -> item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
        }
    }
}