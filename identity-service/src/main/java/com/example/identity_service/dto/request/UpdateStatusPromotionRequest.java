package com.example.identity_service.dto.request;

import com.example.identity_service.enums.PromotionStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateStatusPromotionRequest {
    private Long promotionId;
    private PromotionStatus status;
}
