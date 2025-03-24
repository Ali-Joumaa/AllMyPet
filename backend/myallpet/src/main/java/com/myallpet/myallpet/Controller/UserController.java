package com.myallpet.myallpet.Controller;

import com.myallpet.myallpet.DTO.UserDTO;
import com.myallpet.myallpet.Models.User;
import com.myallpet.myallpet.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // ✅ Fetch all users (admin functionality)
    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    // ✅ Register a new user
    @PostMapping
    public User addUser(@RequestBody User user) {
        return userService.save(user);
    }

    // ✅ Get the currently logged-in user's details
    @GetMapping("/me")
    public UserDTO getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            throw new UnauthorizedAccessException("Unauthorized - No user logged in.");
        }
        User user = userService.findByUsername(userDetails.getUsername());
        return new UserDTO(user);
    }

    // ✅ Get another user's profile dynamically by username
    @GetMapping("/profile/{username}")
    public UserDTO getUserProfile(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if (user == null) {
            throw new UserNotFoundException("User not found.");
        }
        return new UserDTO(user);
    }


    @PutMapping("/update-profile")
public ResponseEntity<UserDTO> updateUserProfile(
        @AuthenticationPrincipal UserDetails userDetails, 
        @RequestBody UserDTO updatedUserData) {

    if (userDetails == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // 🔴 Unauthorized if user is not logged in
    }

    User user = userService.findByUsername(userDetails.getUsername());
    if (user == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 🔴 Return 404 if user is not found
    }

    // ✅ Update fields safely
    if (updatedUserData.getBio() != null) {
        user.setBio(updatedUserData.getBio());
    }
    if (updatedUserData.getYearsPetting() != null) {
        user.setYearsPetting(updatedUserData.getYearsPetting());
    }
    if (updatedUserData.getAddress() != null) {
        user.setAddress(updatedUserData.getAddress());
    }

    User updatedUser = userService.save(user);

    // ✅ Ensure a valid response is returned
    return ResponseEntity.ok(new UserDTO(updatedUser)); // ✅ This ensures the frontend gets a response
}



    // ✅ Exception Handling
    @ResponseStatus(org.springframework.http.HttpStatus.NOT_FOUND)
    static class UserNotFoundException extends RuntimeException {
        public UserNotFoundException(String message) {
            super(message);
        }
    }

    @ResponseStatus(org.springframework.http.HttpStatus.UNAUTHORIZED)
    static class UnauthorizedAccessException extends RuntimeException {
        public UnauthorizedAccessException(String message) {
            super(message);
        }
    }
}
