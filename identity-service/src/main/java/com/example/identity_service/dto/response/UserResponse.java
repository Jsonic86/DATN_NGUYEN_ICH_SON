package com.example.identity_service.dto.response;


import com.example.identity_service.entity.Customer;
import com.example.identity_service.entity.Employee;
import com.example.identity_service.entity.Role;
import com.example.identity_service.enums.UserType;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String id;
    String username;
    String password;
    String firstName;
    String lastName;
    LocalDate dob;

    UserType userType;

    Integer employeeId;

    Integer customerId;

    Set<Role> roles;
}
