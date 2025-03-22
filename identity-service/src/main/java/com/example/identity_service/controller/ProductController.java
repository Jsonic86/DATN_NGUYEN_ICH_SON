package com.example.identity_service.controller;

import com.example.identity_service.dto.request.ProductRequest;
import com.example.identity_service.dto.response.ApiResponse;
import com.example.identity_service.entity.Product;
import com.example.identity_service.repository.ProductRepository;
import com.example.identity_service.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping()
    ApiResponse<List<Product>> getAllProducts() {

        return ApiResponse.<List<Product>>builder()
                .result(productService.findAll())
                .code(1000)
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<Product> getProductById(@PathVariable Integer id) {
        return ApiResponse.<Product>builder()
                .result(productService.findById(id))
                .code(1000)
                .build();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> createProduct(
            @RequestParam("productName") String productName,
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


        Product product = productService.create(request);
        return ResponseEntity.ok(product);
    }
}
