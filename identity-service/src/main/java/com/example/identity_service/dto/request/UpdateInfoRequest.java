package com.example.identity_service.dto.request;

import com.example.identity_service.validator.LocalDateConstraint;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateInfoRequest {
    @Size(min = 8, message = "USERNAME_INVALID")
     String firstName;
     String lastName;
     @LocalDateConstraint(min=16,message = "INVALID_DOB")
     LocalDate dob;
     String email;
     String phoneNumber;
     String address;
}
