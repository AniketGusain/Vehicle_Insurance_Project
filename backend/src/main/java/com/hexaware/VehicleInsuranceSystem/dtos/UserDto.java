package com.hexaware.VehicleInsuranceSystem.dtos;

public class UserDto {

    private String name;
    private String email;
    private String password;
    private String address;
    private String dateOfBirth;
    private String aadhaarNumber;
    private String panNumber;

    public UserDto() {
        super();
    }

    public UserDto(String name, String email, String password, String address, String dateOfBirth, String aadhaarNumber, String panNumber) {
        super();
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
        this.aadhaarNumber = aadhaarNumber;
        this.panNumber = panNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAadhaarNumber() {
        return aadhaarNumber;
    }

    public void setAadhaarNumber(String aadhaarNumber) {
        this.aadhaarNumber = aadhaarNumber;
    }

    public String getPanNumber() {
        return panNumber;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }
}