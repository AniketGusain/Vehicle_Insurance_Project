package com.hexaware.VehicleInsuranceSystem.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.Period;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Getter
@Data
@Entity
@Table(name = "users")
public class User implements UserDetails {




    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id", unique = true)
    private Long id;

    @NotEmpty(message = "Name is required.")
    private String name;

    @Getter
    @NotEmpty(message = "Email is required.")
    @Email(message = "Valid email is required.")
    private String email;

    @NotEmpty(message = "Address is required.")
    private String address;

    @NotNull(message = "Date of Birth is required.")
    private LocalDate dateOfBirth;

    @Column(name = "aadhaar_number", unique = true)
    private String aadhaarNumber;

    @Transient // Not stored in the database, calculated dynamically
    private int age;

    @NotEmpty(message = "PAN number is required.")
    @Column(name = "pan_number", unique = true)
    private String panNumber;

    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_role_junction",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")}
    )
    private Set<UserRole> authorities;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        calculateAge();
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setAuthorities(Set<UserRole> authorities) {
        this.authorities = authorities;
    }

    // Helper method to calculate age from date of birth
    private void calculateAge() {
        if (dateOfBirth != null) {
            LocalDate currentDate = LocalDate.now();
            this.age = Period.between(dateOfBirth, currentDate).getYears();
        }
    }

    public User() {
        super();
        authorities = new HashSet<>();
    }

    public User(String email, String password, Set<UserRole> authorities) {
        super();
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }




    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

//    @Getter
//    @Enumerated(EnumType.STRING)
//    private Provider provider;
//
//    public void setProvider(Provider provider) {
//        this.provider = provider;
//    }
}
