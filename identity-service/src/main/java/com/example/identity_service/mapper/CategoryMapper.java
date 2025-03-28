package com.example.identity_service.mapper;

import com.example.identity_service.dto.request.CategoryRequest;
import com.example.identity_service.dto.request.CategoryUpdationRequest;
import com.example.identity_service.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toCategory(CategoryRequest request);
    Category updateCategory(@MappingTarget Category category, CategoryUpdationRequest request);
}
