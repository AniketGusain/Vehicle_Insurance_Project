package com.hexaware.VehicleInsuranceSystem.services;


import com.hexaware.VehicleInsuranceSystem.dtos.UserDto;
import com.hexaware.VehicleInsuranceSystem.exceptions.AppException;
import com.hexaware.VehicleInsuranceSystem.models.User;
import com.hexaware.VehicleInsuranceSystem.models.UserRole;
import com.hexaware.VehicleInsuranceSystem.repository.UserRepository;
import com.hexaware.VehicleInsuranceSystem.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;


@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> new AppException("User not found.", HttpStatus.NOT_FOUND));
    }

    public User getUserById(Long id, Authentication authentication) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException("User not found.", HttpStatus.NOT_FOUND));
        if (!user.getEmail().equals(authentication.getName())) {
            throw new AppException("Access denied.", HttpStatus.BAD_REQUEST);
        }
        return user;
    }

    public User updateUserById(Long id, UserDto userDto, Authentication authentication) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException("User not found", HttpStatus.NOT_FOUND));
        if (!user.getEmail().equals(authentication.getName())) {
            throw new AppException("Access denied", HttpStatus.BAD_REQUEST);
        }
        String newEmail = userDto.getEmail();
        String newPassword = userDto.getPassword();

        if (newEmail != null && !newEmail.isEmpty()) {
            user.setEmail(newEmail);
        }
        if (newPassword != null && !newPassword.isEmpty()) {
            String hashedNewPassword = passwordEncoder.encode(newPassword);
            user.setPassword(hashedNewPassword);
        }
        userRepository.save(user);
        return user;
    }

    public void processOAuthPostLogin(String username) {
        User existUser = userRepository.getUserByEmail(username);

        if (existUser == null) {
            User newUser = new User();
            newUser.setEmail(username);
//            newUser.setProvider(Provider.GOOGLE);
            UserRole userRole = userRoleRepository.findByAuthority("USER").get();
            Set<UserRole> authorities = new HashSet<>();

            authorities.add(userRole);


            newUser.setAuthorities(authorities);
//            newUser.setEnabled(true);

            userRepository.save(newUser);
        }

    }
}
