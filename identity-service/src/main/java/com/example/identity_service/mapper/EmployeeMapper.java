package com.example.identity_service.mapper;

import com.example.identity_service.dto.request.EmployeeRequest;
import com.example.identity_service.dto.request.EmployeeUpdationRequest;
import com.example.identity_service.dto.response.EmployeeResponse;
import com.example.identity_service.entity.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {

    @Mapping(target = "orders", ignore = true)
    Employee toEmployee(EmployeeRequest employeeRequest);

    Employee updateEmployee(EmployeeUpdationRequest employeeRequest,@MappingTarget Employee employee);
}
