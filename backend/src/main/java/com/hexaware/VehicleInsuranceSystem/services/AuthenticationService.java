package com.hexaware.VehicleInsuranceSystem.services;

import com.hexaware.VehicleInsuranceSystem.dtos.UserLoginDto;
import com.hexaware.VehicleInsuranceSystem.models.User;
import com.hexaware.VehicleInsuranceSystem.models.UserRole;
import com.hexaware.VehicleInsuranceSystem.repository.UserRepository;
import com.hexaware.VehicleInsuranceSystem.repository.UserRoleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    public User register(String name, String email, String password, String address, String dateOfBirth, String aadhaarNumber, String panNumber) {
        String encodedPassword = passwordEncoder.encode(password);

        UserRole userRole = userRoleRepository.findByAuthority("USER").orElseThrow(() -> new RuntimeException("User role not found."));
        Set<UserRole> authorities = new HashSet<>();
        authorities.add(userRole);

        User newUser = new User();
        newUser.setName(name);
        newUser.setEmail(email);
        newUser.setPassword(encodedPassword);
        newUser.setAddress(address);
        newUser.setDateOfBirth(LocalDate.parse(dateOfBirth));
        newUser.setAadhaarNumber(aadhaarNumber);
        newUser.setPanNumber(panNumber);
        newUser.setAuthorities(authorities);

        return userRepository.save(newUser);
    }

    public User registerAdmin(String name, String email, String password, String address, String dateOfBirth, String aadhaarNumber, String panNumber) {
        String encodedPassword = passwordEncoder.encode(password);

        UserRole userRole = userRoleRepository.findByAuthority("ADMIN").orElseThrow(() -> new RuntimeException("Admin role not found."));
        Set<UserRole> authorities = new HashSet<>();
        authorities.add(userRole);

        User newUser = new User();
        newUser.setName(name);
        newUser.setEmail(email);
        newUser.setPassword(encodedPassword);
        newUser.setAddress(address);
        newUser.setDateOfBirth(LocalDate.parse(dateOfBirth));
        newUser.setAadhaarNumber(aadhaarNumber);
        newUser.setPanNumber(panNumber);
        newUser.setAuthorities(authorities);

        return userRepository.save(newUser);
    }

    public UserLoginDto login(String email, String password) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            String token = tokenService.generateJwt(auth);

            User user = userRepository.findByEmail(email).orElse(null);
            if (user != null) {
                return new UserLoginDto(user.getId(), user, token);
            } else {
                return new UserLoginDto(null, null, "");
            }

        } catch (AuthenticationException e) {
            return new UserLoginDto(null, null, "");
        }
    }
}