package com.example.identity_service.service;

import com.example.identity_service.dto.request.ProductSupplierRequest;
import com.example.identity_service.dto.response.ProductSupplierResponse;
import com.example.identity_service.entity.ProductSupplier;
import com.example.identity_service.entity.Supplier;
import com.example.identity_service.mapper.ProductSupplierMapper;
import com.example.identity_service.repository.ProductSupplierRepository;
import com.example.identity_service.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductSupplierService {
    @Autowired
    private ProductSupplierRepository productSupplierRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private ProductSupplierMapper productSupplierMapper;

    public ProductSupplierResponse createProductSupplier(ProductSupplierRequest productSupplierRequest) {
        ProductSupplier productSupplier=new ProductSupplier();
        productSupplier = productSupplierMapper.toProductSupplier(productSupplierRequest);
        productSupplierRepository.save(productSupplier);
        return productSupplierMapper.toProductSupplierResponse(productSupplier);
    }

    public List<ProductSupplier> getAllProductSuppliersBySupplierId(Long supplierId) {
        Supplier supplier = new Supplier();
        supplier=supplierRepository.findById(supplierId).orElseThrow(
                () -> new RuntimeException("Supplier not found")
        );
        List<ProductSupplier> list = productSupplierRepository.findAllBySupplier(supplier);
        return list;
    }
}
