package com.example.identity_service.entity;

import com.example.identity_service.enums.UserType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String username;
    String password;
    String firstName;
    String lastName;
    LocalDate dob;

    @Enumerated(EnumType.STRING)
    UserType userType;

    @OneToOne
    @JoinColumn(name = "employee_id")
    Employee employee;

    @OneToOne
    @JoinColumn(name = "customer_id")
    Customer customer;

    @ManyToMany
    Set<Role> roles;
}
