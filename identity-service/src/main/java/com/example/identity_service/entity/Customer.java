package com.example.identity_service.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.Set;

@Entity
@Table(name = "customer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer customerId;


    @Column(nullable = false, unique = true, length = 255)
    String email;

    @Column(nullable = false,  length = 255)
    String phoneNumber;

    @Column(nullable = false,  length = 255)
    String address;

    @Column(nullable = false,  length = 255)
    String note;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    Set<Order> orders;
}
