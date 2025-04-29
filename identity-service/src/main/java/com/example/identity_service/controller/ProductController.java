package com.example.identity_service.controller;

import com.example.identity_service.dto.request.ProductRequest;
import com.example.identity_service.dto.request.ProductUpdationRequest;
import com.example.identity_service.dto.response.ApiResponse;
import com.example.identity_service.dto.response.CategoryResponse;
import com.example.identity_service.dto.response.ProductResponse;
import com.example.identity_service.entity.Category;
import com.example.identity_service.entity.Product;
import com.example.identity_service.repository.ProductRepository;
import com.example.identity_service.service.CategoryService;
import com.example.identity_service.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {
    @Autowired
    ProductService productService;
    @Autowired
    CategoryService categoryService;

    @GetMapping()
    ApiResponse<Page<ProductResponse>> getAllProducts(
            @RequestParam(defaultValue = "") String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("productId").ascending());
        return ApiResponse.<Page<ProductResponse>>builder()
                .result(productService.findAll(name,pageable))
                .code(1000)
                .build();
    }
    @GetMapping("/by-category")
    ApiResponse<Page<ProductResponse>> getAllProductsByCategory(
            @RequestParam(defaultValue = "") String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam() Long categoryId
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("productId").ascending());
        return ApiResponse.<Page<ProductResponse>>builder()
                .result(productService.findAllByCategoryId(pageable,categoryId))
                .code(1000)
                .build();
    }

    @GetMapping("/detail")
    ApiResponse<ProductResponse> getProductById(@RequestParam Integer id) {
        return ApiResponse.<ProductResponse>builder()
                .result(productService.findById(id))
                .code(1000)
                .build();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Product> createProduct(
            @RequestParam("productName") String productName,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam("description") String description,
            @RequestParam("price") BigDecimal price,
            @RequestParam("stockQuantity") Integer stockQuantity,
            @RequestPart(value = "image", required = false) MultipartFile image) {

        ProductRequest request = new ProductRequest();
        request.setProductName(productName);
        request.setDescription(description);
        request.setPrice(price);
        request.setStockQuantity(stockQuantity);
        request.setImage(image);
        request.setCategoryId(categoryId);

        Product product = productService.create(request);
        return ApiResponse.<Product>builder()
                .result(product)
                .code(1000)
                .message("Product created")
                .build();
    }

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Product> updateProduct(
            @RequestParam("productId") Integer productId,
            @RequestParam("productName") String productName,
            @RequestParam("description") String description,
            @RequestParam("price") BigDecimal price,
            @RequestParam("stockQuantity") Integer stockQuantity,
            @RequestPart(value = "image", required = false) MultipartFile image) {

        ProductUpdationRequest request = new ProductUpdationRequest();
        request.setProductId(productId);
        request.setProductName(productName);
        request.setDescription(description);
        request.setPrice(price);
        request.setStockQuantity(stockQuantity);
        request.setImage(image);


        Product product = productService.update(request);
        return ApiResponse.<Product>builder()
                .result(product)
                .code(1000)
                .message("Product updated")
                .build();
    }

    @DeleteMapping("")
    public ApiResponse<Void> deleteProductById(@RequestParam Integer id) {
        productService.delete(id);
        return ApiResponse.<Void>builder()
                .code(1000)
                .message("Product deleted")
                .build();
    }

    @PostMapping("/set-promotion")
    public ApiResponse<Void> deleteProductById(@RequestParam Integer productId ,@RequestParam Long promotionId ) {
        productService.setPromotion(promotionId,productId);
        return ApiResponse.<Void>builder()
                .code(1000)
                .message("set promotion successfully")
                .build();
    }
}
