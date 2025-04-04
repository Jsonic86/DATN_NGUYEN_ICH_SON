package com.example.identity_service.mapper;

import com.example.identity_service.dto.request.SupplierRequest;
import com.example.identity_service.dto.request.SupplierResponse;
import com.example.identity_service.dto.request.SupplierUpdationRequest;
import com.example.identity_service.dto.response.ProductResponse;
import com.example.identity_service.entity.Product;
import com.example.identity_service.entity.Supplier;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface SupplierMapper {
    Supplier toSupplier(SupplierRequest request);
    SupplierResponse toSupplierResponse(Supplier supplier);
    Supplier updateSupplier(@MappingTarget Supplier supplier, SupplierUpdationRequest request);
}
