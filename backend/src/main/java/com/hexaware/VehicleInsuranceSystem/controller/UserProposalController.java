package com.hexaware.VehicleInsuranceSystem.controller;

import com.hexaware.VehicleInsuranceSystem.models.VehicleInsuranceProposal;
import com.hexaware.VehicleInsuranceSystem.services.VehicleInsuranceProposalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users/{userId}/proposals")
@CrossOrigin("*")
public class UserProposalController {

    @Autowired
    private VehicleInsuranceProposalService proposalService;

    @GetMapping
    public List<VehicleInsuranceProposal> getUserProposals(@PathVariable Long userId) {
        return proposalService.getProposalsByUserId(userId);
    }
}
