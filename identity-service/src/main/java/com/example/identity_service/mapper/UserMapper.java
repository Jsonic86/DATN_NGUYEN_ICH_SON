package com.example.identity_service.mapper;

import com.example.identity_service.dto.request.UserCreationRequest;
import com.example.identity_service.dto.request.UserUpdationRequest;
import com.example.identity_service.dto.response.UserResponse;
import com.example.identity_service.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public abstract class UserMapper {
    @Mapping(target = "roles", ignore = true)
    public abstract User toUser(UserCreationRequest request);

    @Mapping(target = "customerId", source = "customer.customerId")
    @Mapping(target = "employeeId", source = "employee.employeeId")
    public abstract UserResponse toUserResponse(User user);

    @Mapping(target = "customerId", source = "customer.customerId")
    @Mapping(target = "employeeId", source = "employee.employeeId")
    public abstract UserResponse toUser (User user);

    @Mapping(target = "roles", ignore = true)
    public abstract void updateUser(@MappingTarget User user, UserUpdationRequest request);

}
