package com.myallpet.myallpet.DTO;

// import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.myallpet.myallpet.Models.User;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {

    private Long userId;
    private String username;
    private String email;
    private String firstname;
    private String lastname;
    private String phoneNumber;
    private String role; // Important for UI logic to display user-specific options based on role
    private String bio; // User bio or description, potentially useful in community features

    // Consider whether you might want to expose additional details, depending on privacy considerations:
    private String profilePictureURL; // URL to the user's profile picture, enhancing the user profile visually

    // Include lists of DTOs related to the user's activity if needed
    // These are commented out but can be included based on actual use cases in your application
    // private List<PetCardDTO> petCards;
    // private List<AdoptionPostDTO> adoptionPosts;

    public UserDTO(User user) {
        this.userId = user.getUserId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.profilePictureURL = user.getUserProfilePicture();
        this.role = user.getRole();
    }
}