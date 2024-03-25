package com.hexaware.VehicleInsuranceSystem.controller;

import com.hexaware.VehicleInsuranceSystem.dtos.UserDto;
import com.hexaware.VehicleInsuranceSystem.dtos.UserLoginDto;
import com.hexaware.VehicleInsuranceSystem.exceptions.AppException;
import com.hexaware.VehicleInsuranceSystem.models.User;
import com.hexaware.VehicleInsuranceSystem.services.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public User register(@Valid @RequestBody UserDto userDto) {
        if (userDto.getEmail() == null || userDto.getEmail().isEmpty() || userDto.getPassword() == null || userDto.getPassword().isEmpty()) {
            throw new AppException("All fields are required.", HttpStatus.BAD_REQUEST);
        }

        return authenticationService.register(userDto.getName(), userDto.getEmail(), userDto.getPassword(), userDto.getAddress(), userDto.getDateOfBirth(), userDto.getAadhaarNumber(), userDto.getPanNumber());
    }

    @PostMapping("/admin/register")
    public User registerAdmin(@Valid @RequestBody UserDto userDto) {
        if (userDto.getEmail() == null || userDto.getEmail().isEmpty() || userDto.getPassword() == null || userDto.getPassword().isEmpty()) {
            throw new AppException("All fields are required.", HttpStatus.BAD_REQUEST);
        }

        return authenticationService.registerAdmin(userDto.getName(), userDto.getEmail(), userDto.getPassword(), userDto.getAddress(), userDto.getDateOfBirth(), userDto.getAadhaarNumber(), userDto.getPanNumber());
    }

    @PostMapping("/login")
    public UserLoginDto login(@Valid @RequestBody UserDto userDto) {
        UserLoginDto userLoginDto = authenticationService.login(userDto.getEmail(), userDto.getPassword());

        if (userLoginDto.getUser() == null) {
            throw new AppException("Invalid credentials.", HttpStatus.NOT_FOUND);
        }

        return userLoginDto;
    }
}