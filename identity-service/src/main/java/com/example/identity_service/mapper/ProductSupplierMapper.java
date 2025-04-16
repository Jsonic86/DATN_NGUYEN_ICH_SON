package com.example.identity_service.mapper;

import com.example.identity_service.dto.request.ProductSupplierRequest;
import com.example.identity_service.dto.response.ProductSupplierResponse;
import com.example.identity_service.entity.Product;
import com.example.identity_service.entity.ProductSupplier;
import com.example.identity_service.entity.Supplier;
import com.example.identity_service.repository.ProductRepository;
import com.example.identity_service.repository.SupplierRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class ProductSupplierMapper {

    @Autowired
    protected SupplierRepository supplierRepository;

    @Autowired
    protected ProductRepository productRepository;

    @Mapping(target = "supplier", source = "supplierId", qualifiedByName = "mapSupplier")
    @Mapping(target = "product", source = "productId", qualifiedByName = "mapProduct")
    public abstract ProductSupplier toProductSupplier(ProductSupplierRequest request);

    @Mapping(target = "supplierId", source = "supplier.id")
    @Mapping(target = "productId", source = "product.productId")
    public abstract ProductSupplierResponse toProductSupplierResponse(ProductSupplier productSupplier);

    @Named("mapSupplier")
    public Supplier mapSupplier(Long supplierId) {
        if (supplierId == null) return null;
        return supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found with id: " + supplierId));
    }
    @Named("mapProduct")
    public Product mapProduct(Integer productId) {
        if (productId == null) return null;
        return productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Supplier not found with id: " + productId));
    }
}