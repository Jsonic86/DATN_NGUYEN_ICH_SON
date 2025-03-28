package com.example.identity_service.dto.request;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

public class CategoryUpdationRequest {
    Long categoryId;
    String categoryName;
    String categoryDescription;

}
