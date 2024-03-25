package com.hexaware.VehicleInsuranceSystem.controller;

import com.hexaware.VehicleInsuranceSystem.dtos.PolicyDto;
import com.hexaware.VehicleInsuranceSystem.exceptions.AppException;
import com.hexaware.VehicleInsuranceSystem.models.Active;
import com.hexaware.VehicleInsuranceSystem.models.Policy;
import com.hexaware.VehicleInsuranceSystem.services.PolicyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/policies")
@CrossOrigin("*")
public class PolicyController {

    @Autowired
    private PolicyService policyService;

    @PostMapping("/create")
    public Policy createPolicy(@Valid @RequestBody PolicyDto policyDto) {
        if (policyDto == null) {
            throw new AppException("Policy details cannot be empty", HttpStatus.BAD_REQUEST);
        }
        return policyService.createPolicy(policyDto);
    }

    @PatchMapping("/{policyId}/status")
    public Policy changePolicyStatus(@PathVariable Long policyId, @RequestParam boolean newStatus) {
        if (policyId == null) {
            throw new AppException("Policy ID cannot be empty", HttpStatus.BAD_REQUEST);
        }
        return policyService.changePolicyStatus(policyId, newStatus);
    }
    @GetMapping("/all")
    public List<Policy> getAllPolicies() {
        return policyService.getAllPolicies();
    }
}
