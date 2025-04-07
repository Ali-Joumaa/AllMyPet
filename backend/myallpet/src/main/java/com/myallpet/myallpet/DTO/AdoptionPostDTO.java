package com.myallpet.myallpet.DTO;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@NoArgsConstructor
public class AdoptionPostDTO {

    private Long id;
    private Long userId; // Reference to the user who created the post
    private Long petId;  // Reference to the pet being adopted
    private String title;
    private UserDTO user;
    private String description;
    private String status;  // Status might include values like 'Available', 'Pending', 'Adopted'
    private String adoptionType;  // Type of adoption, e.g., 'Foster', 'Adopt', 'Temporary'
    private LocalDate postedDate;
    private String petName; // Optionally include some pet details directly if commonly displayed
    private String petSpecies; // This can be helpful for filtering or quick views without needing additional requests
    private String petBreed;  // Including pet breed might be relevant for users looking for specific types of pets
    private String imageUrl;  // Image URL if the post includes pictures of the pet
    private String profileImage;  // Image URL if the post includes pictures of the pet
    private Integer petAge;
    private String petSex;
    private String petLocation;
    private String vaccines;
    private String healthInfo;
    
}
