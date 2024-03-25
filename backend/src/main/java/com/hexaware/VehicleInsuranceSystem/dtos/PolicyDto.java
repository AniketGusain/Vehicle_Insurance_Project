package com.hexaware.VehicleInsuranceSystem.dtos;

import com.hexaware.VehicleInsuranceSystem.models.Active;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PolicyDto {

    private String policyName;
    private String policyDescription;
    private String policyCompany;
    private String companyDescription;
    private boolean activePolicy;
    private int claimsServed;
    private int policyPrice;

}
