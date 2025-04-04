package com.example.identity_service.repository;

import com.example.identity_service.dto.request.SupplierResponse;
import com.example.identity_service.entity.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier,Long> {
    Page<Supplier> findBySupplierNameContaining(String supplierName, Pageable pageable);
}
