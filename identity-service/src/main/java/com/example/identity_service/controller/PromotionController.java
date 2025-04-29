package com.example.identity_service.controller;

import com.example.identity_service.dto.request.PromotionRequest;
import com.example.identity_service.dto.request.PromotionUpdationRequest;
import com.example.identity_service.dto.response.ApiResponse;
import com.example.identity_service.dto.response.PromotionResponse;
import com.example.identity_service.enums.PromotionStatus;
import com.example.identity_service.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/promotions")
public class PromotionController {
    @Autowired
    private PromotionService promotionService;

    @GetMapping("")
    public ApiResponse<Page<PromotionResponse>> findAll(
            @RequestParam(defaultValue = "") String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("promotionId").ascending());
        return ApiResponse.<Page<PromotionResponse>>builder()
                .result(promotionService.findAll(pageable,name))
                .code(1000)
                .message("successfully")
                .build();
    }
    @GetMapping("/detail")
    public ApiResponse<PromotionResponse> findById(
            @RequestParam Long promotionId
    ) {
        return ApiResponse.<PromotionResponse>builder()
                .result(promotionService.findById(promotionId))
                .code(1000)
                .message("successfully")
                .build();
    }
    @PostMapping("")
    public ApiResponse<PromotionResponse> save(@RequestBody PromotionRequest promotionRequest) {
        return ApiResponse.<PromotionResponse>builder()
                .result(promotionService.create(promotionRequest))
                .code(1000)
                .message("successfully")
                .build();
    }
    @PostMapping("/update-status")
    public ApiResponse<Void> updateStatus(@RequestParam Long promotionId, @RequestParam PromotionStatus status) {
        return ApiResponse.<Void>builder()
                .result(promotionService.updateStatus(status,promotionId))
                .code(1000)
                .message("successfully")
                .build();
    }
    @PutMapping("")
    public ApiResponse<PromotionResponse> save(@RequestBody PromotionUpdationRequest promotionRequest) {
        return ApiResponse.<PromotionResponse>builder()
                .result(promotionService.update(promotionRequest))
                .code(1000)
                .message("successfully")
                .build();
    }
}
