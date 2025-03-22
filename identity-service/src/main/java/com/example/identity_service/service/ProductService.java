package com.example.identity_service.service;

import com.example.identity_service.dto.request.ProductRequest;
import com.example.identity_service.entity.Product;
import com.example.identity_service.entity.User;
import com.example.identity_service.exception.AppException;
import com.example.identity_service.exception.ErrorCode;
import com.example.identity_service.mapper.ProductMapper;
import com.example.identity_service.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    ProductMapper productMapper;

    public List<Product> findAll(){
         List<Product> products = productRepository.findAll();
         return products;
    }
    public Product findById(int id){
        Product product = productRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_EXISTED)
        );
        return product;
    }
    public Product create(ProductRequest request){

        Product product = productMapper.toProduct(request);
        try {
            if (request.getImage() != null && !request.getImage().isEmpty()) {
                product.setImage(request.getImage().getBytes()); // Chuyển ảnh thành byte array
            }
        } catch (IOException e) {
            throw new RuntimeException("Lỗi khi xử lý ảnh", e);
        }
        return productRepository.save(product);
    }
}
