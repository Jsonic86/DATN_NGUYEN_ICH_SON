package com.example.identity_service.controller;

import com.example.identity_service.dto.request.PaymenttRequest;
import com.example.identity_service.dto.response.ApiResponse;
import com.example.identity_service.enums.PaymentStatus;
import com.example.identity_service.service.PaymentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/payments")
@Slf4j
public class PaymentController {

    @Autowired
    private PaymentService vnpayService;

    @PostMapping("/update-status")
    public ApiResponse<Void> updateStatus(@RequestParam int orderId, @RequestParam PaymentStatus status) {
        vnpayService.updatePaymentStatus(orderId, status);
        return ApiResponse.<Void>builder()
                .result(null)
                .message("sussess")
                .code(1000)
                .build();
    }

    @GetMapping("/create-payment")
    public ApiResponse<String> createPayment(@RequestParam String orderInfo, @RequestParam Long amount,@RequestParam String returnUrl) {
        String paymentUrl = vnpayService.createPaymentUrl(orderInfo, amount,returnUrl);
        return  ApiResponse.<String>builder()
                .code(1000)
                .message("success")
                .result(paymentUrl)
                .build();
    }
}
