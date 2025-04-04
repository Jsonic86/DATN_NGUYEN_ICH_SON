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
public class UserUpdationRequest {
     String id;
     @Size(min = 5, message = "USERNAME_INVALID")
     String username;
     String firstName;
     String lastName;
     @LocalDateConstraint(min=18,message = "INVALID_DOB")
     LocalDate dob;
     UserType userType;
     Set<String> roles;
}
