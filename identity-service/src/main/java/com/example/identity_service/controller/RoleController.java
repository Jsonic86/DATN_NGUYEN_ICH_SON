package com.example.identity_service.controller;

import com.example.identity_service.dto.request.RoleRequest;
import com.example.identity_service.dto.response.ApiResponse;
import com.example.identity_service.dto.response.RoleResponse;
import com.example.identity_service.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleController {
    @Autowired
    RoleService roleService;

    @PostMapping
    ApiResponse<RoleResponse> create(@RequestBody RoleRequest roleRequest) {
        return ApiResponse.<RoleResponse>builder()
                .code(1000)
                .result(roleService.create(roleRequest))
                .build();
    }

    @GetMapping
    ApiResponse<List<RoleResponse>> getAll() {
        return ApiResponse.<List<RoleResponse>>builder()
                .result(roleService.getAll())
                .build();
    }

    @DeleteMapping("")
    ApiResponse<Void> delete(@RequestParam String id) {
        roleService.delete(id);
        return ApiResponse.<Void>builder().build();
    }
}
