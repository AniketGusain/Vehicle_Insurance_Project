package com.hexaware.VehicleInsuranceSystem.dtos;

import com.hexaware.VehicleInsuranceSystem.models.ProposalStatus;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class VehicleInsuranceProposalDto {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Policy ID is required") // New field
    private Long policyId;

//    @NotEmpty(message = "Vehicle type is required")
//    private String vehicleType;
//
//    @NotEmpty(message = "Vehicle model is required")
//    private String vehicleModel;
//
//    private int vehicleYear;
//
//    @NotEmpty(message = "Vehicle VIN is required")
//    private String vehicleVin;
//
//    @NotEmpty(message = "Insurance coverage is required")
//    private String insuranceCoverage;

    private ProposalStatus proposalStatus;

//    private String additionalInfo;
//
//    private Date createdAt;

    // Getters and setters
}