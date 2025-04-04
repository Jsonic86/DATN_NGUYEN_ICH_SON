package com.example.identity_service.controller;

import com.example.identity_service.dto.response.ApiGetAllResponse;
import com.example.identity_service.dto.response.ApiResponse;
import com.example.identity_service.dto.request.UserCreationRequest;
import com.example.identity_service.dto.request.UserUpdationRequest;
import com.example.identity_service.dto.response.UserResponse;
import com.example.identity_service.entity.User;
import com.example.identity_service.repository.UserRepositoy;
import com.example.identity_service.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    @Autowired
    private UserService userService;
    
    @Autowired
    private UserRepositoy userRepositoy;

    @PostMapping("/register")
    ApiResponse<User> createUser(@RequestBody @Valid UserCreationRequest request) {
        ApiResponse<User> apiResponse = new ApiResponse<>();
        apiResponse.setResult(
                userService.createRequest(request)
        );
        return apiResponse;
    }

    @GetMapping()
    ApiGetAllResponse<User> getAllUsers() {
        return userService.getAllUser();
    }

    @GetMapping("/myInfo")
    ApiResponse<UserResponse> getMyInfo() {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getMyInfo())
                .build();
    }
    @GetMapping("/detail")
    ApiResponse<User> getUserByID(@RequestParam String id) {
        return ApiResponse.<User>builder()
                .code(1000)
                .result(userService.getUserById(id))
                .build();
    }
    @PutMapping()
    User updateUser(@RequestBody UserUpdationRequest request) {
        return userService.updateRequest(request);
    }

    @DeleteMapping()
    ApiResponse<Void> deleteUser(@RequestParam String id) {
        userService.deleteUserById(id);
        return ApiResponse.<Void>builder()
                .code(1000)
                .build();
    }
}
