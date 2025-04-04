package com.example.identity_service.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.Set;

@Entity
@Table(name = "employee")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer employeeId;

    @Column(nullable = false, unique = true, length = 255)
    String email;

    @Column(nullable = false,  length = 255)
    String phoneNumber;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    Set<Order> orders;
}

