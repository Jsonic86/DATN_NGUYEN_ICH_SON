package com.example.identity_service.controller;

import com.example.identity_service.dto.request.SupplierRequest;
import com.example.identity_service.dto.request.SupplierResponse;
import com.example.identity_service.dto.request.SupplierUpdationRequest;
import com.example.identity_service.dto.response.ApiResponse;
import com.example.identity_service.entity.Supplier;
import com.example.identity_service.service.SupplierService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/suppliers")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SupplierController {
    @Autowired
    SupplierService supplierService;

    @GetMapping("/search")
    ApiResponse<Page<SupplierResponse>> search(@RequestParam(defaultValue = "") String name,
                                                     @RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        return ApiResponse.<Page<SupplierResponse>>builder()
                .message("success")
                .result(supplierService.searchSupplier(name, pageable))
                .code(1000)
                .build();
    }

    @GetMapping("")
    ApiResponse<List<Supplier>> getSuppliers() {
        return ApiResponse.<List<Supplier>>builder()
                .code(1000)
                .result(supplierService.findAllSupplier())
                .message("success")
                .build();
    }
    @GetMapping("/detail")
    ApiResponse<Supplier> getSuppliers(@RequestParam Long id) {
        return ApiResponse.<Supplier>builder()
                .code(1000)
                .result(supplierService.findSupplierById(id))
                .message("success")
                .build();
    }
    @PostMapping()
    ApiResponse<Supplier> createSupplier(@RequestBody SupplierRequest supplierRequest) {
        return ApiResponse.<Supplier>builder()
                .result(supplierService.createSupplier(supplierRequest))
                .message("success")
                .code(1000)
                .build();
    }
    @PutMapping()
    ApiResponse<Supplier> updateSupplier(@RequestBody SupplierUpdationRequest request) {
        return ApiResponse.<Supplier>builder()
                .result(supplierService.updateSupplier(request))
                .message("success")
                .code(1000)
                .build();
    }
    @DeleteMapping()
    ApiResponse<Void> deleteSupplier(@RequestParam Long id) {
        supplierService.deleteSupplier(id);
        return ApiResponse.<Void>builder()
                .message("success")
                .code(1000)
                .build();
    }
}

