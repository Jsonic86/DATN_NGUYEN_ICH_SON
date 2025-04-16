package com.example.identity_service.dto.request;

import com.example.identity_service.entity.Order;
import com.example.identity_service.enums.PaymentMethod;
import com.example.identity_service.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentRequest {
    PaymentMethod paymentMethod;

    PaymentStatus paymentStatus ;

    LocalDateTime paymentDate ;

    Integer orderId;
}
