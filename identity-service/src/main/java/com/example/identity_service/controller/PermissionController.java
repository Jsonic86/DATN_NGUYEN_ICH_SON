package com.example.identity_service.controller;

import com.example.identity_service.dto.request.PermissionRequest;
import com.example.identity_service.dto.response.ApiResponse;
import com.example.identity_service.dto.response.PermissionResponse;
import com.example.identity_service.service.PermissionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/permissions")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PermissionController {
    @Autowired
    PermissionService permissionService;

    @PostMapping
    ApiResponse<PermissionResponse> create(@RequestBody PermissionRequest permissionRequest) {
        return ApiResponse.<PermissionResponse>builder()
                .code(1000)
                .result(permissionService.create(permissionRequest))
                .build();
    }

    @GetMapping
    ApiResponse<List<PermissionResponse>> getAll() {
        return ApiResponse.<List<PermissionResponse>>builder()
                .result(permissionService.getAll())
                .build();
    }

    @DeleteMapping("")
    ApiResponse<Void> delete(@RequestParam String id) {
        permissionService.delete(id);
        return ApiResponse.<Void>builder().build();
    }
}
