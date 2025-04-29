package com.example.identity_service.repository;

import com.example.identity_service.dto.response.PromotionResponse;
import com.example.identity_service.entity.Promotion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {
    Page<Promotion> findByNameContaining(String name, Pageable pageable);
}
