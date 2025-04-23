package com.myallpet.myallpet.Controller;

import com.myallpet.myallpet.DTO.LoginRequestDTO;
import com.myallpet.myallpet.DTO.SignUpRequestDTO;
import com.myallpet.myallpet.Models.User;
import com.myallpet.myallpet.Repository.UserRepository;
import com.myallpet.myallpet.Service.UserService;
import com.myallpet.myallpet.utils.JwtUtils;
import com.myallpet.myallpet.utils.JwtResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    private UserRepository userRepository;

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
        String jwt = jwtUtils.generateToken(userDetails.getUsername());
        
        // Fetch user entity to get role
        User user = userRepository.findByUsername(userDetails.getUsername())
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        JwtResponse jwtResponse = new JwtResponse(jwt, user.getUsername(), user.getRole());
        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/signup")
public ResponseEntity<?> registerUser(@RequestBody SignUpRequestDTO signUpRequest) {
    try {
        if (userService.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setFirstname(signUpRequest.getFirstName());
        user.setLastname(signUpRequest.getLastName());

        // Corrected admin check
        if ("admin".equals(signUpRequest.getUsername()) && 
            "admin".equals(signUpRequest.getPassword())) {
            user.setRole("ADMIN");
        } else {
            user.setRole("USER");
        }

        userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    } catch (Exception e) {
        e.printStackTrace(); // For debugging in logs
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body("An error occurred during registration");
    }
}

}
