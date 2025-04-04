package com.example.identity_service.service;

import com.example.identity_service.dto.request.UserCreationRequest;
import com.example.identity_service.dto.request.UserUpdationRequest;
import com.example.identity_service.dto.response.ApiGetAllResponse;
import com.example.identity_service.dto.response.UserResponse;
import com.example.identity_service.entity.User;
import com.example.identity_service.exception.AppException;
import com.example.identity_service.exception.ErrorCode;
import com.example.identity_service.mapper.UserMapper;
import com.example.identity_service.repository.EmployeeRepository;
import com.example.identity_service.repository.RoleRepository;
import com.example.identity_service.repository.UserRepositoy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Slf4j
@Service
public class UserService {
    @Autowired
    private UserRepositoy userRepositoy;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private EmployeeRepository employeeRepository;

    public User createRequest(UserCreationRequest request){
        if(userRepositoy.existsByUsername(request.getUsername())){
            throw  new AppException(ErrorCode.USERNAME_INVALID);
        }
        User user = userMapper.toUser(request);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        var roles=roleRepository.findAllById(request.getRoles());
        user.setRoles(new HashSet<>(roles));
        return userRepositoy.save(user);
    }

    public User updateRequest(UserUpdationRequest request){
        User user = userRepositoy.findById(request.getId()).orElseThrow(
                ()->new AppException(ErrorCode.USER_NOT_EXISTED)
        );
        userMapper.updateUser(user, request);
        var roles=roleRepository.findAllById(request.getRoles());
        user.setRoles(new HashSet<>(roles));
        userRepositoy.save(user);
        return user;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public ApiGetAllResponse<User> getAllUser(){
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("user Name {}",authentication.getName());
        authentication.getAuthorities().forEach(authority -> {
            log.info("user Role {}",authority.getAuthority());
        });

        ApiGetAllResponse<User> response = new ApiGetAllResponse<>();
        response.setResult(userRepositoy.findAll());
        return response;
    }

    @PostAuthorize("returnObject.username == authentication.name")
    public User getUserById(String id){
        return userRepositoy.findById(id).orElseThrow(
                () -> new RuntimeException("User not found")
        );
    }

    public void deleteUserById(String id){
        User deletedUser = userRepositoy.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_EXISTED)
        );
        if(deletedUser!=null){
            userRepositoy.deleteById(id);
        }
    }

    public UserResponse getMyInfo(){
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User userGet = userRepositoy.findByUsername(name).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_EXISTED)
        );

        return  userMapper.toUser(userGet);
    }
}
