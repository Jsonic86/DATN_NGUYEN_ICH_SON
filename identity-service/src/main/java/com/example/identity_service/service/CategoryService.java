package com.example.identity_service.service;

import com.example.identity_service.dto.request.CategoryRequest;
import com.example.identity_service.dto.request.CategoryUpdationRequest;
import com.example.identity_service.entity.Category;
import com.example.identity_service.exception.AppException;
import com.example.identity_service.exception.ErrorCode;
import com.example.identity_service.mapper.CategoryMapper;
import com.example.identity_service.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private CategoryMapper categoryMapper;

    public List<Category> findAll(){
        return  categoryRepository.findAll();
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
            categoryRepository.deleteById(id);
        }
        else throw new AppException(ErrorCode.CATEGORY_NOT_EXISTED);
    }
}
