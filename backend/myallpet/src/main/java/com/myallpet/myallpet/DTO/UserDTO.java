package com.myallpet.myallpet.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {

    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String role; // Important for UI logic to display user-specific options based on role
    private String bio; // User bio or description, potentially useful in community features

    // Consider whether you might want to expose additional details, depending on privacy considerations:
    private String profilePictureUrl; // URL to the user's profile picture, enhancing the user profile visually

    // Include lists of DTOs related to the user's activity if needed
    // These are commented out but can be included based on actual use cases in your application
    // private List<PetCardDTO> petCards;
    // private List<AdoptionPostDTO> adoptionPosts;
}