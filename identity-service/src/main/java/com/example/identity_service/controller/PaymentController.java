package com.example.identity_service.controller;

import com.example.identity_service.dto.request.PaymenttRequest;
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

    @GetMapping("/create-payment")
    public String createPayment(@RequestParam String orderInfo, @RequestParam Long amount) {
        String paymentUrl = vnpayService.createPaymentUrl(orderInfo, amount);
        return "Thanh toán tại URL: " + paymentUrl;
    }
}
