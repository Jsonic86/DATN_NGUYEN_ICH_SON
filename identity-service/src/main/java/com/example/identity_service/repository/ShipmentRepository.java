package com.example.identity_service.repository;

import com.example.identity_service.entity.ShipmentAddress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipmentRepository extends JpaRepository<ShipmentAddress,Integer> {
}
