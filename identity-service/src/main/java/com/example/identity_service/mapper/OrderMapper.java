package com.example.identity_service.mapper;

import com.example.identity_service.dto.request.ProductRequest;
import com.example.identity_service.dto.request.ProductUpdationRequest;
import com.example.identity_service.dto.response.OrderResponse;
import com.example.identity_service.dto.response.ProductResponse;
import com.example.identity_service.entity.Category;
import com.example.identity_service.entity.Order;
import com.example.identity_service.entity.Product;
import com.example.identity_service.repository.CategoryRepository;
import com.example.identity_service.service.ImageUploadService;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class OrderMapper {

    @Mapping(target = "customerId", source = "customer.customerId")
    public abstract OrderResponse toOrderResponse(Order order);

}