package com.hexaware.VehicleInsuranceSystem.services;

import com.hexaware.VehicleInsuranceSystem.dtos.VehicleInsuranceProposalDto;
import com.hexaware.VehicleInsuranceSystem.models.Policy;
import com.hexaware.VehicleInsuranceSystem.models.ProposalStatus;
import com.hexaware.VehicleInsuranceSystem.models.User;
import com.hexaware.VehicleInsuranceSystem.models.VehicleInsuranceProposal;
import com.hexaware.VehicleInsuranceSystem.repository.UserRepository;
import com.hexaware.VehicleInsuranceSystem.repository.VehicleInsuranceProposalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class VehicleInsuranceProposalService {

    @Autowired
    private VehicleInsuranceProposalRepository proposalRepository;

    @Autowired
    private UserRepository userRepository;

    public VehicleInsuranceProposal createProposal(VehicleInsuranceProposalDto proposalDto) {
        User user = userRepository.findById(proposalDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        VehicleInsuranceProposal proposal = new VehicleInsuranceProposal();
        proposal.setUser(user);
//        proposal.setVehicleType(proposalDto.getVehicleType());
//        proposal.setVehicleModel(proposalDto.getVehicleModel());
//        proposal.setVehicleYear(proposalDto.getVehicleYear());
//        proposal.setVehicleVin(proposalDto.getVehicleVin());
//        proposal.setInsuranceCoverage(proposalDto.getInsuranceCoverage());
        proposal.setProposalStatus(ProposalStatus.SUBMITTED);
//        proposal.setAdditionalInfo(proposalDto.getAdditionalInfo());
//        proposal.setCreatedAt(new Date());

        // Set Policy using policyId from DTO
        proposal.setPolicy(new Policy(proposalDto.getPolicyId()));

        return proposalRepository.save(proposal);
    }

    public List<VehicleInsuranceProposal> getAllProposal() {
        return proposalRepository.findAll();
    }

    public List<VehicleInsuranceProposal> getProposalsByUserId(Long userId) {
        return proposalRepository.findByUserId(userId);
    }
    public boolean updateProposalStatus(Long proposalId, ProposalStatus newStatus) {
        Optional<VehicleInsuranceProposal> optionalProposal = proposalRepository.findById(proposalId);
        if (optionalProposal.isPresent()) {
            VehicleInsuranceProposal proposal = optionalProposal.get();
            proposal.setProposalStatus(newStatus);
            proposalRepository.save(proposal);
            return true;
        } else {
            return false;
        }
    }
}