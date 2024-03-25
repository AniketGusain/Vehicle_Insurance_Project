package com.hexaware.VehicleInsuranceSystem.models;

import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Value;

@Entity
@Table(name = "policy")
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "policy_id")
    private Long id;

    @Column(name = "policy_name", nullable = false)
    private String policyName;

    @Column(name = "description")
    private String policyDescription;

    @Column(name = "company", nullable = false)
    private String policyCompany;

    @Column(name = "company_description")
    private String companyDescription;

    @Column(name = "active_policy", nullable = false)
    private boolean activePolicy ;

    @Column(name = "claims_served")
    private int claimsServed;

    @Column(name = "price")
    private int policyPrice;

    // Constructors, getters, and setters

    public Policy(Long id) {
        this.id = id;
    }

    public Policy() {
    }

    public String getPolicyDescription() {
        return policyDescription;
    }

    public void setPolicyDescription(String policyDescription) {
        this.policyDescription = policyDescription;
    }

    public int getPolicyPrice() {
        return policyPrice;
    }

    public void setPolicyPrice(int policyPrice) {
        this.policyPrice = policyPrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPolicyName() {
        return policyName;
    }

    public void setPolicyName(String policyName) {
        this.policyName = policyName;
    }



    public String getPolicyCompany() {
        return policyCompany;
    }

    public void setPolicyCompany(String policyCompany) {
        this.policyCompany = policyCompany;
    }

    public String getCompanyDescription() {
        return companyDescription;
    }

    public void setCompanyDescription(String companyDescription) {
        this.companyDescription = companyDescription;
    }

    public boolean isActivePolicy() {
        return activePolicy;
    }

    public void setActivePolicy(boolean activePolicy) {
        this.activePolicy = activePolicy;
    }

    public int getClaimsServed() {
        return claimsServed;
    }

    public void setClaimsServed(int claimsServed) {
        this.claimsServed = claimsServed;
    }
}
