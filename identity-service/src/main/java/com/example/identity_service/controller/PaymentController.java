package com.example.identity_service.controller;

import com.example.identity_service.dto.request.PaymentRequest;
import com.example.identity_service.dto.response.ApiResponse;
import com.example.identity_service.dto.response.PaymentResponse;
import com.example.identity_service.enums.PaymentStatus;
import com.example.identity_service.service.PaymentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentController {
    @Autowired
    PaymentService paymentService;

    @PostMapping()
    public ApiResponse<PaymentResponse> createPayment(@RequestBody PaymentRequest paymentRequest) {
        return ApiResponse.<PaymentResponse>builder()
                .code(1000)
                .message("Success")
                .result(paymentService.createPayment(paymentRequest))
                .build();
    }

//    @PostMapping()
//    public ApiResponse<PaymentResponse> updateStatusPayment(@RequestParam Long id, @RequestParam PaymentStatus paymentStatus) {}
}
