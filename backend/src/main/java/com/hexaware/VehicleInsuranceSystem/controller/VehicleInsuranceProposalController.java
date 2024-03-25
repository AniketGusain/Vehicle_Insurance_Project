package com.hexaware.VehicleInsuranceSystem.controller;

import com.hexaware.VehicleInsuranceSystem.dtos.VehicleInsuranceProposalDto;
import com.hexaware.VehicleInsuranceSystem.models.Policy;
import com.hexaware.VehicleInsuranceSystem.models.ProposalStatus;
import com.hexaware.VehicleInsuranceSystem.models.VehicleInsuranceProposal;
import com.hexaware.VehicleInsuranceSystem.services.VehicleInsuranceProposalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/proposals")
@CrossOrigin("*")
public class VehicleInsuranceProposalController {

    @Autowired
    private VehicleInsuranceProposalService proposalService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public VehicleInsuranceProposal createProposal(@Valid @RequestBody VehicleInsuranceProposalDto proposalDto) {
        return proposalService.createProposal(proposalDto);
    }

    @PutMapping("/status/{proposalId}")
    public ResponseEntity<String> updateProposalStatus(@PathVariable Long proposalId, @RequestParam ProposalStatus newStatus) {
        boolean updated = proposalService.updateProposalStatus(proposalId, newStatus);
        if (updated) {
            return ResponseEntity.ok("Proposal status updated successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/all")
    public List<VehicleInsuranceProposal> getAllProposal() {
        return proposalService.getAllProposal();
    }
}
