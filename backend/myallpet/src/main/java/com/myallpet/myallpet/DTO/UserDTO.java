package com.myallpet.myallpet.DTO;

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
    private String role;
    private String bio;
    private String profilePictureURL;  // ✅ User's profile picture
    private Integer yearsPetting;       // ✅ Years of experience in petting
    private String address;             // ✅ User's location (renamed from `location` to `address`)

    public UserDTO(User user) {
        this.userId = user.getUserId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.firstname = user.getFirstname();
        this.lastname = user.getLastname();
        this.role = user.getRole();
        this.bio = user.getBio(); 
        this.profilePictureURL = user.getUserProfilePicture();
        this.yearsPetting = user.getYearsPetting();
        this.address = user.getAddress();
    }
}