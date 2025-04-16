package com.example.identity_service.dto.response;

import com.example.identity_service.enums.PaymentMethod;
import com.example.identity_service.enums.PaymentStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentResponse {
    PaymentMethod paymentMethod;

    PaymentStatus paymentStatus ;

    LocalDateTime paymentDate ;

    Integer orderId;
}
