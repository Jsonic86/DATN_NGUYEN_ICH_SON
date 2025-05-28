package com.example.identity_service.repository;

import com.example.identity_service.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    @Query("SELECT COUNT(p) FROM Payment p WHERE p.paymentMethod = 'TIEN_MAT' AND p.order.orderDate BETWEEN :startDate AND :endDate")
    long countCashPayments(@Param("startDate") LocalDateTime startDate,
                           @Param("endDate") LocalDateTime endDate);

    @Query("SELECT COUNT(p) FROM Payment p WHERE p.paymentMethod = 'THE_TIN_DUNG' AND p.order.orderDate BETWEEN :startDate AND :endDate")
    long countVNPayPayments(@Param("startDate") LocalDateTime startDate,
                              @Param("endDate") LocalDateTime endDate);
}
