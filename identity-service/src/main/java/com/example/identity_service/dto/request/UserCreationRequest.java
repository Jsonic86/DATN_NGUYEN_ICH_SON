package com.example.identity_service.dto.request;

import com.example.identity_service.enums.UserType;
import com.example.identity_service.validator.LocalDateConstraint;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
    @Size(min = 8, message = "USERNAME_INVALID")
     String username;
     String password;
     String firstName;
     String lastName;
     @LocalDateConstraint(min=16,message = "INVALID_DOB")
     LocalDate dob;
     @Builder.Default
     UserType userType=UserType.CUSTOMER;
     Set<String> roles;
}
