package com.example.identity_service.service;

import com.example.identity_service.dto.request.PaymentRequest;
import com.example.identity_service.dto.response.PaymentResponse;
import com.example.identity_service.entity.Order;
import com.example.identity_service.entity.Payment;
import com.example.identity_service.exception.AppException;
import com.example.identity_service.exception.ErrorCode;
import com.example.identity_service.mapper.PaymentMapper;
import com.example.identity_service.repository.OrderRepository;
import com.example.identity_service.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PaymentMapper paymentMapper;

    public PaymentResponse createPayment(PaymentRequest paymentRequest) {
        Order order = orderRepository.findById(paymentRequest.getOrderId()).orElseThrow(
                () -> new AppException(ErrorCode.ORDER_ITEM_EMPTY)
        );

        Payment payment = Payment.builder()
                .paymentMethod(paymentRequest.getPaymentMethod())
                .order(order)
                .paymentStatus(paymentRequest.getPaymentStatus())
                .paymentDate(LocalDateTime.now())
                .build();

        paymentRepository.save(payment);
        return paymentMapper.toPaymentResponse(payment);
    }
}
