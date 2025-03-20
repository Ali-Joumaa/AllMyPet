package com.myallpet.myallpet.Controller;

import com.myallpet.myallpet.DTO.UserDTO;
import com.myallpet.myallpet.Models.User;
import com.myallpet.myallpet.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
public UserDTO updateUserProfile(
    @AuthenticationPrincipal UserDetails userDetails, 
    @RequestBody UserDTO updatedUserData
) {    System.out.println("✅✅✅✅✅✅✅✅");

    if (userDetails == null) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized - No user logged in.");
    }

    System.out.println("🔎 Authenticated User: " + userDetails.getUsername()); // ✅ Debugging

    // Fetch the logged-in user
    User user = userService.findByUsername(userDetails.getUsername());
    if (user == null) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
    }

    // ✅ Debug Logging Incoming Data
    System.out.println("🔄 Incoming Bio: " + updatedUserData.getBio());
    System.out.println("🔄 Incoming YearsPetting: " + updatedUserData.getYearsPetting());
    System.out.println("🔄 Incoming Location: " + updatedUserData.getAddress());

    // ✅ Update user details only if they are provided
    if (updatedUserData.getBio() != null) {
        user.setBio(updatedUserData.getBio());
    }
    if (updatedUserData.getYearsPetting() != null) {
        user.setYearsPetting(updatedUserData.getYearsPetting());
    }
    if (updatedUserData.getAddress() != null) {
        user.setAddress(updatedUserData.getAddress()); // ✅ Fixed: `address` instead of `location`
    }

    if (updatedUserData.getProfilePictureURL() != null && !updatedUserData.getProfilePictureURL().isEmpty()) {
        user.setUserProfilePicture(updatedUserData.getProfilePictureURL());
    }

    User updatedUser = userService.save(user);
    
    return new UserDTO(updatedUser);
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
