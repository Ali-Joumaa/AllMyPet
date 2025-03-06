package com.myallpet.myallpet.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DetailedAdoptionPostDTO extends AdoptionPostDTO {
    private String userName;
    private String userContact;
    private PetCardDTO petDetails;
}
