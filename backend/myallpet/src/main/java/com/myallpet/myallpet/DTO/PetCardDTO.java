package com.myallpet.myallpet.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PetCardDTO {
    private Long petId;
    private String name;
    private String species;
    private String breed;
    private Integer age;
    private String sex;
    private String petPhoto;
    private String description;
    private String location;
    private String status;
    private Long userId;
    
}
