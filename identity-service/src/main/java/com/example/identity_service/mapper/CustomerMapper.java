package com.example.identity_service.mapper;

import com.example.identity_service.dto.request.CustomerRequest;
import com.example.identity_service.dto.request.CustomerUpdationRequest;
import com.example.identity_service.dto.request.EmployeeRequest;
import com.example.identity_service.dto.request.EmployeeUpdationRequest;
import com.example.identity_service.entity.Customer;
import com.example.identity_service.entity.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;


@Mapper(componentModel = "spring")
public interface CustomerMapper {

    @Mapping(target = "orders", ignore = true)
    Customer toCustomer(CustomerRequest customerRequest);

    Customer updateCustomer(CustomerUpdationRequest customerRequest, @MappingTarget Customer customer);
}