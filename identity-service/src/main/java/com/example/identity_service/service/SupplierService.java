package com.example.identity_service.service;

import com.example.identity_service.dto.request.SupplierRequest;
import com.example.identity_service.dto.request.SupplierResponse;
import com.example.identity_service.dto.request.SupplierUpdationRequest;
import com.example.identity_service.entity.Supplier;
import com.example.identity_service.exception.AppException;
import com.example.identity_service.exception.ErrorCode;
import com.example.identity_service.mapper.SupplierMapper;
import com.example.identity_service.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;
    @Autowired
    private SupplierMapper supplierMapper;

    public Page<SupplierResponse> searchSupplier(String keyword , Pageable pageable) {
       try {
           Page<Supplier> supplier = supplierRepository.findBySupplierNameContaining(keyword, pageable);
           return supplier.map(supplierMapper::toSupplierResponse);
       }
       catch (AppException e) {
           e.printStackTrace();
           return Page.empty();
       }

    }
    public List<Supplier> findAllSupplier() {
        List<Supplier> suppliers = supplierRepository.findAll();
        return suppliers;
    }
    public Supplier findSupplierById(Long id) {
        return supplierRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.SUPPLIER_NOT_EXISTED)
        );
    }
    public Supplier createSupplier(SupplierRequest request) {
        Supplier newSupplier = new Supplier();
        newSupplier = supplierMapper.toSupplier(request);
        return supplierRepository.save(newSupplier);
    }
    public Supplier updateSupplier(SupplierUpdationRequest request) {
        Supplier updatedSupplier = supplierRepository.findById(request.getId()).orElseThrow(
                () -> new AppException(ErrorCode.SUPPLIER_NOT_EXISTED)
        );
        updatedSupplier=supplierMapper.updateSupplier(updatedSupplier, request);
        return supplierRepository.save(updatedSupplier);
    }
    public void deleteSupplier(Long id) {
        boolean isExisted = supplierRepository.existsById(id);
        if (isExisted) {
            supplierRepository.deleteById(id);
        }
        else {
            throw new AppException(ErrorCode.SUPPLIER_NOT_EXISTED);
        }
    }
}
