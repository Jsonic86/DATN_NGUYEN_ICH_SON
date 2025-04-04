package com.example.identity_service.service;

import com.example.identity_service.dto.request.EmployeeRequest;
import com.example.identity_service.dto.request.EmployeeUpdationRequest;
import com.example.identity_service.dto.response.EmployeeResponse;
import com.example.identity_service.entity.Employee;
import com.example.identity_service.entity.User;
import com.example.identity_service.exception.AppException;
import com.example.identity_service.exception.ErrorCode;
import com.example.identity_service.mapper.EmployeeMapper;
import com.example.identity_service.repository.EmployeeRepository;
import com.example.identity_service.repository.UserRepositoy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepositoy userRepositoy;

    @Autowired
    private EmployeeMapper employeeMapper;

    public Employee addEmployee(EmployeeRequest employeeRequest) {
        Employee employee = new Employee();
        employee= employeeMapper.toEmployee(employeeRequest);
//        userGet.setEmployee(employee);
        User user = new User();
        user = userRepositoy.findById(employeeRequest.getUserId()).orElseThrow(
                ()->  new AppException(ErrorCode.USER_NOT_EXISTED)
        );
        user.setEmployee(employee);
        employeeRepository.save(employee);
        userRepositoy.save(user);
        return employee;
    }
    public Employee updateEmployee(EmployeeUpdationRequest request) {
        Employee updateEmployee = new Employee();
        updateEmployee = employeeRepository.findById(request.getEmployeeId()).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_EXISTED)
        );
        updateEmployee = employeeMapper.updateEmployee(request, updateEmployee);
        User user = new User();
        user = userRepositoy.findById(request.getUserId()).orElseThrow(
                ()->  new AppException(ErrorCode.USER_NOT_EXISTED)
        );
        user.setEmployee(updateEmployee);
        employeeRepository.save(updateEmployee);
        userRepositoy.save(user);
        return updateEmployee;
    }
}
