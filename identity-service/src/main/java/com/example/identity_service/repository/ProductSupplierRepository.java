package com.example.identity_service.repository;

import com.example.identity_service.entity.ProductSupplier;
import com.example.identity_service.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductSupplierRepository extends JpaRepository<ProductSupplier,Long> {
    List<ProductSupplier> findAllBySupplier(Supplier supplier);
}
