package com.example.identity_service.service;

import com.example.identity_service.dto.request.CategoryRequest;
import com.example.identity_service.dto.request.CategoryUpdationRequest;
import com.example.identity_service.dto.response.CategoryResponse;
import com.example.identity_service.entity.Category;
import com.example.identity_service.exception.AppException;
import com.example.identity_service.exception.ErrorCode;
import com.example.identity_service.mapper.CategoryMapper;
import com.example.identity_service.repository.CategoryRepository;
import com.example.identity_service.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryMapper categoryMapper;

    public Page<Category> findAll(String name, Pageable pageable) {
        Page<Category> categories = categoryRepository.findByCategoryNameContaining(name,pageable);
        return  categories;
    }
    public Category findById(Long id){
        return categoryRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED)
        );
    }
    public Category create(CategoryRequest request){
        Category category = new Category();
        category = categoryMapper.toCategory(request);
        return categoryRepository.save(category);
    }
    public Category update(CategoryUpdationRequest request){
        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(
                () -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED)
        );
        categoryMapper.updateCategory(category,request);
        return categoryRepository.save(category);
    }
    public void delete(Long id){
        boolean isExists = categoryRepository.existsById(id);
        if(isExists){
            Category category = categoryRepository.findById(id).orElseThrow(
                    ()-> new AppException(ErrorCode.CATEGORY_NOT_EXISTED)
            );
            boolean isExistCategory = productRepository.existsByCategory(category);
            if(isExistCategory){
                throw new AppException(ErrorCode.CATEGORY_LINK_PRODUCT);
            }
            else categoryRepository.deleteById(id);
        }
        else throw new AppException(ErrorCode.CATEGORY_NOT_EXISTED);
    }
}
