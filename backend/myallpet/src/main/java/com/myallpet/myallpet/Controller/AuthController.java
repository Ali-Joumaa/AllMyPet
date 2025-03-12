package com.myallpet.myallpet.Controller;

import com.myallpet.myallpet.DTO.LoginRequestDTO;
import com.myallpet.myallpet.DTO.SignUpRequestDTO;
import com.myallpet.myallpet.Models.User;
import com.myallpet.myallpet.Service.UserService;
import com.myallpet.myallpet.utils.JwtUtils;
import com.myallpet.myallpet.utils.JwtResponse; // Ensure you have this response class defined to handle JWT responses

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
    
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwt = jwtUtils.generateToken(userDetails.getUsername());  // Assuming a method that generates the token
        JwtResponse jwtResponse = new JwtResponse(jwt, userDetails.getUsername());  // Include additional data as necessary
        return ResponseEntity.ok(jwtResponse);
    }

@PostMapping("/signup")
public ResponseEntity<?> registerUser(@RequestBody SignUpRequestDTO signUpRequest) {
    try {
        if (userService.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        // Create a new user instance from the provided data
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setFirstname(signUpRequest.getFirstName());
        user.setLastname(signUpRequest.getLastName());

        // System.out.println("DEBUG: User being saved -> Username: " + user.getUsername());
        // System.out.println("DEBUG: Email: " + user.getEmail());
        // System.out.println("DEBUG: Password (hashed): " + user.getPassword());
        // System.out.println("DEBUG: First Name: " + user.getFirstname());
        // System.out.println("DEBUG: Last Name: " + user.getLastname());

        // Save the new user
        userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    } catch (Exception e) {
        // Log the exception and return an appropriate error response
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
    }
}
}
