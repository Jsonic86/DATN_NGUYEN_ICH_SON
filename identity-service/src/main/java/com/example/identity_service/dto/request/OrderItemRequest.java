package com.example.identity_service.dto.request;

import com.example.identity_service.entity.OrderDetail;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItemRequest {
    private Integer productId;
    private int quantity;
}
