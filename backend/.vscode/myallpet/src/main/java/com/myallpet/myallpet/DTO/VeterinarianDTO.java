package com.myallpet.myallpet.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VeterinarianDTO {
    private Long vetId;
    private String firstName;
    private String lastName;
    private String email;
    private Integer expYears;
    private String sex;
    private String location;
    private String profilePicture;
    private String phoneNumber;
}
