package com.myallpet.myallpet.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetRecommendationDTO {
    private String location;
    private List<PetBriefDTO> recommendedPets;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class PetBriefDTO {
    private String name;
    private String species;
    private String breed;
}
