package com.example.identity_service.controller;

import com.example.identity_service.dto.request.CustomerRequest;
import com.example.identity_service.dto.request.CustomerUpdationRequest;
import com.example.identity_service.dto.response.ApiResponse;
import com.example.identity_service.entity.Customer;
import com.example.identity_service.service.CustomerService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @PostMapping()
    ApiResponse<Customer> createCustomer(@RequestBody CustomerRequest request) {
        return ApiResponse.<Customer>builder()
                .code(1000)
                .message("Success")
                .result(customerService.addCustomer(request))
                .build();
    }
    @PutMapping()
    ApiResponse<Customer> updateCustomer(@RequestBody CustomerUpdationRequest request) {
        return ApiResponse.<Customer>builder()
                .code(1000)
                .message("Success")
                .result(customerService.updateCustomer(request))
                .build();
    }
}
