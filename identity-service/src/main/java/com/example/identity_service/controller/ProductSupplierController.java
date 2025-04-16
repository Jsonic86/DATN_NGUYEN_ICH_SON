package com.example.identity_service.controller;

import com.example.identity_service.dto.request.ProductSupplierRequest;
import com.example.identity_service.dto.response.ApiResponse;
import com.example.identity_service.dto.response.ProductSupplierResponse;
import com.example.identity_service.entity.ProductSupplier;
import com.example.identity_service.service.ProductSupplierService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.logging.log4j.util.Supplier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product-supplier")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductSupplierController {
   @Autowired
   ProductSupplierService productSupplierService;

    @GetMapping()
    ApiResponse<List<ProductSupplier>> getProductSuppliers(@RequestParam Long supplierId) {
        return ApiResponse.<List<ProductSupplier>>builder()
                .code(1000)
                .message("success")
                .result(productSupplierService.getAllProductSuppliersBySupplierId(supplierId))
                .build();
    }
    @PostMapping()
    ApiResponse<ProductSupplierResponse> createProductSupplier(@RequestBody ProductSupplierRequest request) {
        return ApiResponse.<ProductSupplierResponse>builder()
                .code(1000)
                .message("success")
                .result(productSupplierService.createProductSupplier(request))
                .build();
    }
}
