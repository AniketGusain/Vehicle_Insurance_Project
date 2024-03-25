package com.hexaware.VehicleInsuranceSystem.repository;

import com.hexaware.VehicleInsuranceSystem.models.Policy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyRepository extends JpaRepository<Policy, Long> {
}