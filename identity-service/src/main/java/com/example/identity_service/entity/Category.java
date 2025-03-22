package com.example.identity_service.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    @Column(unique = true)
    String categoryName;
    String categoryDescription;
    LocalDateTime createdAt;
}
