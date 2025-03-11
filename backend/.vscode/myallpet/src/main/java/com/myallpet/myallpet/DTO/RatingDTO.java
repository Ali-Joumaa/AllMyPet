package com.myallpet.myallpet.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RatingDTO {
    private Long rateId;
    private String description;
    private Integer numberOfStars;
    private Long userId;
}
