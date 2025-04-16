package com.example.identity_service.controller;

import com.example.identity_service.dto.request.OrderRequest;
import com.example.identity_service.dto.response.ApiResponse;
import com.example.identity_service.dto.response.OrderResponse;
import com.example.identity_service.enums.OrderStatus;
import com.example.identity_service.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {
    @Autowired
    OrderService orderService;

    @PostMapping("/create")
    public ApiResponse<OrderResponse> create(@RequestBody OrderRequest request ) {
        return ApiResponse.<OrderResponse>builder()
                .result(orderService.createOrder(request))
                .code(1000)
                .build();
    }

    @GetMapping()
    public ApiResponse<List<OrderResponse>> getAll() {
        return ApiResponse.<List<OrderResponse>>builder()
                .result(orderService.getAllOrders())
                .code(1000)
                .message("success")
                .build();
    }
    @PostMapping("/update-status")
    public ApiResponse<OrderResponse> updateStatus(@RequestParam Integer id,@RequestParam OrderStatus status) {
        return ApiResponse.<OrderResponse>builder()
                .result(orderService.updateStatus(id, status))
                .code(1000)
                .message("update status successfully")
                .build();
    }
}
