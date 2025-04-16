package com.example.identity_service.repository;

import com.example.identity_service.entity.Category;
import com.example.identity_service.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    Page<Product> findAll(Pageable pageable);
    Page<Product> findByProductNameContaining(String name, Pageable pageable);
    boolean existsByCategory(Category category);
}
