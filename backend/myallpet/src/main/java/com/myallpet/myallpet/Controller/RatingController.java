package com.myallpet.myallpet.Controller;

import com.myallpet.myallpet.DTO.RatingDTO;
import com.myallpet.myallpet.Models.Rating;
import com.myallpet.myallpet.Models.User;
import com.myallpet.myallpet.Service.RatingService;
import com.myallpet.myallpet.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @Autowired
    private UserRepository userRepository;

    // Create new rating
    @PostMapping
public ResponseEntity<RatingDTO> createRating(@RequestBody RatingDTO dto) {
    // 👇 Use username from request body
    User user = userRepository.findByUsername(dto.getUsername())
                  .orElseThrow(() -> new RuntimeException("User not found"));


    Rating rating = new Rating();
    rating.setDescription(dto.getDescription());
    rating.setNumberOfStars(dto.getNumberOfStars());
    rating.setUser(user);
    rating.setCreatedAt(LocalDateTime.now());

    ratingService.saveRating(rating);

    RatingDTO responseDto = new RatingDTO(
        rating.getRateId(),
        rating.getDescription(),
        rating.getNumberOfStars(),
        user.getUserId(),
        user.getUsername(),
        user.getUserProfilePicture()
    );

    return ResponseEntity.ok(responseDto);
}


    // Get recent ratings
    @GetMapping("/recent")
    public ResponseEntity<List<RatingDTO>> getRecentRatings() {
        List<RatingDTO> dtos = ratingService.getRecentRatings().stream()
            .map(r -> new RatingDTO(
                r.getRateId(),
                r.getDescription(),
                r.getNumberOfStars(),
                r.getUser().getUserId(),
                r.getUser().getUsername(),
                r.getUser().getUserProfilePicture()
            ))
            .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }
}
