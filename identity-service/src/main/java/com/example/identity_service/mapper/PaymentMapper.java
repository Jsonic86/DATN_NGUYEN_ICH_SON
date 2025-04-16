package com.example.identity_service.mapper;

import com.example.identity_service.dto.response.OrderResponse;
import com.example.identity_service.dto.response.PaymentResponse;
import com.example.identity_service.entity.Order;
import com.example.identity_service.entity.Payment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class PaymentMapper {

    @Mapping(target = "orderId", source = "order.orderId")
    public abstract PaymentResponse toPaymentResponse(Payment payment);

}