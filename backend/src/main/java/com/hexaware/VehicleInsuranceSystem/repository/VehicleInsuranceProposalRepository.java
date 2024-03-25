package com.hexaware.VehicleInsuranceSystem.repository;

import com.hexaware.VehicleInsuranceSystem.models.VehicleInsuranceProposal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleInsuranceProposalRepository extends JpaRepository<VehicleInsuranceProposal, Long> {
    List<VehicleInsuranceProposal> findByUserId(Long userId);
}
