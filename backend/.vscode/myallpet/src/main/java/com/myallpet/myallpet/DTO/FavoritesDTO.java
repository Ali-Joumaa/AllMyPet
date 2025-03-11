package com.myallpet.myallpet.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FavoritesDTO {

    private Long id;  // ID of the favorite record
    private Long userId;  // User who marked the favorite
    private Long petId;  // ID of the pet associated with this favorite
    private String petName;  // Name of the pet from the PetCard entity
    private String imageUrl;  // Image URL from the PetCard entity
    private String petSpecies;  // Species from the PetCard entity
    private String adoptionPostStatus;  // Current status of the adoption post, if applicable

    // You might want to include other pertinent details from the PetCard or AdoptionPost entities if needed
}
