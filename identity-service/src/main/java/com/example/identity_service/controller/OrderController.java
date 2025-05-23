package com.example.identity_service.controller;

import com.example.identity_service.dto.request.GetRevenueRequest;
import com.example.identity_service.dto.request.OrderRequest;
import com.example.identity_service.dto.response.ApiResponse;
import com.example.identity_service.dto.response.OrderResponse;
import com.example.identity_service.entity.Order;
import com.example.identity_service.entity.OrderDetail;
import com.example.identity_service.enums.OrderStatus;
import com.example.identity_service.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
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
    public ApiResponse<Page<Order>> getAll(@RequestParam(defaultValue = "") String name,
                                           @RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("orderId").descending());
        return ApiResponse.<Page<Order>>builder()
                .result(orderService.getAllOrders(pageable))
                .code(1000)
                .message("success")
                .build();
    }
    @GetMapping("/by-customer-id")
    public ApiResponse<Page<Order>> getAllByCustomerId(@RequestParam() int customerId,
                                           @RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("orderId").descending());
        return ApiResponse.<Page<Order>>builder()
                .result(orderService.getAllOrdersByCustomerId(customerId,pageable))
                .code(1000)
                .message("success")
                .build();
    }
    @GetMapping("/get-order-detail")
    public ApiResponse<Order> getOrderDetail(@RequestParam() int orderId) {
        return ApiResponse.<Order>builder()
                .result(orderService.getOrderDetail(orderId))
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
    @GetMapping("/month")
    public ApiResponse<List<BigDecimal>> getRevenueByMonth(
            @RequestParam("year") int year
            ) {
        return ApiResponse.<List<BigDecimal>>builder()
                .message("success")
                .result(orderService.getRevenueByMonth(year))
                .code(1000)
                .build();
    }
}
