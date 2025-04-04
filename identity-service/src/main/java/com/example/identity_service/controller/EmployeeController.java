package com.example.identity_service.controller;

import com.example.identity_service.dto.request.EmployeeRequest;
import com.example.identity_service.dto.request.EmployeeUpdationRequest;
import com.example.identity_service.dto.response.ApiResponse;
import com.example.identity_service.entity.Employee;
import com.example.identity_service.service.EmployeeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @PostMapping()
    ApiResponse<Employee> createEmployee(@RequestBody EmployeeRequest request) {
        return ApiResponse.<Employee>builder()
                .code(1000)
                .message("Success")
                .result(employeeService.addEmployee(request))
                .build();
    }
    @PutMapping()
    ApiResponse<Employee> updateEmployee(@RequestBody EmployeeUpdationRequest request) {
        return ApiResponse.<Employee>builder()
                .code(1000)
                .message("Success")
                .result(employeeService.updateEmployee(request))
                .build();
    }
}
