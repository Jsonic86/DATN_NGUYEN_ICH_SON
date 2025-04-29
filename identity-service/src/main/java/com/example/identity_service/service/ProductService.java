package com.example.identity_service.service;

import com.example.identity_service.dto.request.ProductRequest;
import com.example.identity_service.dto.request.ProductUpdationRequest;
import com.example.identity_service.dto.response.ProductResponse;
import com.example.identity_service.entity.Product;
import com.example.identity_service.entity.Promotion;
import com.example.identity_service.exception.AppException;
import com.example.identity_service.exception.ErrorCode;
import com.example.identity_service.mapper.ProductMapper;
import com.example.identity_service.repository.CategoryRepository;
import com.example.identity_service.repository.ProductRepository;
import com.example.identity_service.repository.PromotionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    ProductMapper productMapper;

    public Page<ProductResponse> findAll(String name,Pageable pageable) {
        try {
            Page<Product> products = productRepository.findByProductNameContaining(name,pageable);
            return products.map(productMapper::toProductResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return Page.empty();
        }
    }
    public Page<ProductResponse> findAllByCategoryId(Pageable pageable,Long categoryId) {
        try {
            Page<Product> products = productRepository.findByCategoryCategoryId(pageable,categoryId);
            return products.map(productMapper::toProductResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return Page.empty();
        }
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

    public Void setPromotion (Long promotionId,int productId){
        Product product =productRepository.findById(productId).orElseThrow(
                () -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED)
        );
        if(product!=null){
            Promotion promotion =promotionRepository.findById(promotionId).orElseThrow(null);
            if(promotion!=null){
                product.setPromotion(promotion);
                productRepository.save(product);
            }
        }
        return null;
    }
}
