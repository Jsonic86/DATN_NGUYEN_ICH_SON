package com.example.identity_service.service;

import com.example.identity_service.dto.request.PromotionRequest;
import com.example.identity_service.dto.request.PromotionUpdationRequest;
import com.example.identity_service.dto.response.PromotionResponse;
import com.example.identity_service.entity.Promotion;
import com.example.identity_service.enums.PromotionStatus;
import com.example.identity_service.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PromotionService {
    @Autowired
    private PromotionRepository promotionRepository;

    public Page<PromotionResponse> findAll(Pageable pageable,String name) {
        return promotionRepository.findByNameContaining(name,pageable);
    }

    public PromotionResponse findById(Long id) {
       Promotion promotion = promotionRepository.findById(id).orElse(null);
       PromotionResponse promotionResponse = new PromotionResponse();
       if(promotion != null) {
         promotionResponse.setPromotionId(promotion.getPromotionId());
           promotionResponse.setDescription(promotion.getDescription());
           promotionResponse.setName(promotion.getName());
           promotionResponse.setStatus(promotion.getStatus());
           promotionResponse.setEndDate(promotion.getEndDate());
           promotionResponse.setStartDate(promotion.getStartDate());
           promotionResponse.setDiscountAmount(promotion.getDiscountAmount());
           promotionResponse.setDiscountPercent(promotion.getDiscountPercent());
       }
       return promotionResponse;
    }
    public PromotionResponse create(PromotionRequest promotionRequest) {
        Promotion promotion = new Promotion();
        PromotionResponse promotionResponse = new PromotionResponse();
        if(promotion != null) {
            promotion.setDescription(promotionRequest.getDescription());
            promotion.setName(promotionRequest.getName());
            promotion.setStatus(promotionRequest.getStatus());
            promotion.setEndDate(promotionRequest.getEndDate());
            promotion.setStartDate(promotionRequest.getStartDate());
            promotion.setDiscountAmount(promotionRequest.getDiscountAmount());
            promotion.setDiscountPercent(promotionRequest.getDiscountPercent());
            promotionRepository.save(promotion);
            promotionResponse.setPromotionId(promotion.getPromotionId());
            promotionResponse.setDescription(promotion.getDescription());
            promotionResponse.setName(promotion.getName());
            promotionResponse.setStatus(promotion.getStatus());
            promotionResponse.setEndDate(promotion.getEndDate());
            promotionResponse.setStartDate(promotion.getStartDate());
            promotionResponse.setDiscountAmount(promotion.getDiscountAmount());
            promotionResponse.setDiscountPercent(promotion.getDiscountPercent());
        }
        return promotionResponse;
    }
    public PromotionResponse update(PromotionUpdationRequest promotionRequest) {
        Promotion promotion = promotionRepository.findById(promotionRequest.getPromotionId()).orElse(null);
        PromotionResponse promotionResponse = new PromotionResponse();
        if(promotion != null) {
            promotion.setDescription(promotionRequest.getDescription());
            promotion.setName(promotionRequest.getName());
            promotion.setStatus(promotionRequest.getStatus());
            promotion.setEndDate(promotionRequest.getEndDate());
            promotion.setStartDate(promotionRequest.getStartDate());
            promotion.setDiscountAmount(promotionRequest.getDiscountAmount());
            promotion.setDiscountPercent(promotionRequest.getDiscountPercent());
            promotionRepository.save(promotion);
            promotionResponse.setPromotionId(promotion.getPromotionId());
            promotionResponse.setDescription(promotion.getDescription());
            promotionResponse.setName(promotion.getName());
            promotionResponse.setStatus(promotion.getStatus());
            promotionResponse.setEndDate(promotion.getEndDate());
            promotionResponse.setStartDate(promotion.getStartDate());
            promotionResponse.setDiscountAmount(promotion.getDiscountAmount());
            promotionResponse.setDiscountPercent(promotion.getDiscountPercent());
        }
        return promotionResponse;
    }

    public Void updateStatus(PromotionStatus status,Long promotionId) {
        Promotion promotion = promotionRepository.findById(promotionId).orElse(null);
        PromotionResponse promotionResponse = new PromotionResponse();
        if(promotion != null) {
            promotion.setStatus(status);
            promotionRepository.save(promotion);
        }
        return null;
    }
}
