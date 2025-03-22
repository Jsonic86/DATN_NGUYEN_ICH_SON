package com.example.identity_service.mapper;

import com.example.identity_service.dto.request.ProductRequest;
import com.example.identity_service.dto.request.UserCreationRequest;
import com.example.identity_service.entity.Product;
import com.example.identity_service.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "createdAt", ignore = true)
    Product toProduct(ProductRequest request);
}
