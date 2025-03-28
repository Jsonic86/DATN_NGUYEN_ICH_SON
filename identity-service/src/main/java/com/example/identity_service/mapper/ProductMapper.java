package com.example.identity_service.mapper;

import com.example.identity_service.dto.request.ProductRequest;
import com.example.identity_service.dto.request.ProductUpdationRequest;
import com.example.identity_service.dto.response.ProductResponse;
import com.example.identity_service.entity.Category;
import com.example.identity_service.entity.Product;
import com.example.identity_service.repository.CategoryRepository;
import com.example.identity_service.service.ImageUploadService;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class ProductMapper {

    @Autowired
    private ImageUploadService imageUploadService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Mapping(source = "image", target = "imageUrl", qualifiedByName = "multipartFileToUrl")
    @Mapping(target = "category", source = "categoryId", qualifiedByName = "mapCategory")
    public abstract Product toProduct(ProductRequest request);

    @Mapping(source = "image", target = "imageUrl", qualifiedByName = "multipartFileToUrl")
    public abstract Product updateProduct(@MappingTarget Product product, ProductUpdationRequest request);

    @Mapping(target = "categoryName", source = "category.categoryName")
    public abstract ProductResponse toProductResponse(Product product);

    public abstract List<ProductResponse> toProductList(List<Product> products);

    @Named("multipartFileToUrl")
    String multipartFileToUrl(MultipartFile file) {
        return (file != null && !file.isEmpty()) ? imageUploadService.uploadImage(file) : null;
    }

    @Named("mapCategory")
    protected Category mapCategory(Long categoryId) {
        if (categoryId == null) return null;
        return categoryRepository.findById(categoryId).orElseThrow(
                () -> new RuntimeException("Category not found with id: " + categoryId)
        );
    }
}