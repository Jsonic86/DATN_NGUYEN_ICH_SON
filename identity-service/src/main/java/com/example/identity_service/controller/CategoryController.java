package com.example.identity_service.controller;

import com.example.identity_service.dto.request.CategoryRequest;
import com.example.identity_service.dto.request.CategoryUpdationRequest;
import com.example.identity_service.dto.response.ApiResponse;
import com.example.identity_service.entity.Category;
import com.example.identity_service.service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @GetMapping()
    public ApiResponse<Page<Category>> findAll(
            @RequestParam(defaultValue = "") String name  ,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        Pageable pageable = PageRequest.of(page, size, Sort.by("categoryId").ascending());
        return ApiResponse.<Page<Category>>builder()
                .result(categoryService.findAll(name, pageable))
                .code(1000)
                .build();
    }

    @GetMapping("/detail")
    public ApiResponse<Category> findById(@RequestParam Long id){
        return ApiResponse.<Category>builder()
                .result(categoryService.findById(id))
                .code(1000)
                .build();
    }

    @PostMapping()
    public ApiResponse<Category> create(@RequestBody CategoryRequest request){
        return ApiResponse.<Category>builder()
                .result(categoryService.create(request))
                .code(1000)
                .build();
    }
    @PutMapping()
    public ApiResponse<Category> update(@RequestBody CategoryUpdationRequest request){
        return ApiResponse.<Category>builder()
                .result(categoryService.update(request))
                .code(1000)
                .build();
    }

    @DeleteMapping("")
    public ApiResponse<Void> delete(@RequestParam Long id){
        categoryService.delete(id);
        return ApiResponse.<Void>builder()
                .code(1000)
                .message("deleted")
                .build();
    }
}
