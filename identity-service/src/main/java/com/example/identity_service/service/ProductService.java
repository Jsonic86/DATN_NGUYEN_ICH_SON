package com.example.identity_service.service;

import com.example.identity_service.dto.request.ProductRequest;
import com.example.identity_service.dto.request.ProductUpdationRequest;
import com.example.identity_service.dto.response.ProductResponse;
import com.example.identity_service.entity.Product;
import com.example.identity_service.exception.AppException;
import com.example.identity_service.exception.ErrorCode;
import com.example.identity_service.mapper.ProductMapper;
import com.example.identity_service.repository.CategoryRepository;
import com.example.identity_service.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    ProductMapper productMapper;

    public List<ProductResponse> findAll(){
        List<Product> products = productRepository.findAll();
        List<ProductResponse> responseList = productMapper.toProductList(products);
        return responseList;
    }

    public ProductResponse findById(int id){
        Product product = productRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED)
        );
        return productMapper.toProductResponse(product);
    }

    public Product create(ProductRequest request){

        Product product = productMapper.toProduct(request);
        return productRepository.save(product);
    }

    public Product update(ProductUpdationRequest request){

        Product product =productRepository.findById(request.getProductId()).orElseThrow(
                () -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED)
        );
        productMapper.updateProduct(product,request);
        return productRepository.save(product);
    }

    public void delete(int id){
        boolean exists = productRepository.existsById(id);
        if(exists){
            productRepository.deleteById(id);
        }
        else throw new AppException(ErrorCode.PRODUCT_NOT_EXISTED);
    }
}
