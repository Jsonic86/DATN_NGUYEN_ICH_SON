package com.example.identity_service.service;

import com.example.identity_service.dto.request.CustomerRequest;
import com.example.identity_service.dto.request.CustomerUpdationRequest;
import com.example.identity_service.dto.request.EmployeeRequest;
import com.example.identity_service.dto.request.EmployeeUpdationRequest;
import com.example.identity_service.entity.Customer;
import com.example.identity_service.entity.Employee;
import com.example.identity_service.entity.User;
import com.example.identity_service.exception.AppException;
import com.example.identity_service.exception.ErrorCode;
import com.example.identity_service.mapper.CustomerMapper;
import com.example.identity_service.mapper.EmployeeMapper;
import com.example.identity_service.repository.CustomerRepository;
import com.example.identity_service.repository.EmployeeRepository;
import com.example.identity_service.repository.UserRepositoy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserRepositoy userRepositoy;

    @Autowired
    private CustomerMapper customerMapper;

    public Customer addCustomer(CustomerRequest customerRequest) {
        Customer customer = new Customer();
        customer= customerMapper.toCustomer(customerRequest);
//        userGet.setEmployee(employee);
        User user = new User();
        user = userRepositoy.findById(customerRequest.getUserId()).orElseThrow(
                ()->  new AppException(ErrorCode.USER_NOT_EXISTED)
        );
        user.setCustomer(customer);
        customerRepository.save(customer);
        userRepositoy.save(user);
        return customer;
    }
    public Customer updateCustomer(CustomerUpdationRequest request) {
        Customer updateCustomer = new Customer();
        updateCustomer = customerRepository.findById(request.getCustomerId()).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_EXISTED)
        );
        updateCustomer = customerMapper.updateCustomer(request, updateCustomer);
        User user = new User();
        user = userRepositoy.findById(request.getUserId()).orElseThrow(
                ()->  new AppException(ErrorCode.USER_NOT_EXISTED)
        );
        user.setCustomer(updateCustomer);
        customerRepository.save(updateCustomer);
        userRepositoy.save(user);
        return updateCustomer;
    }
}
