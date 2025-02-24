package com.myallpet.myallpet.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myallpet.myallpet.Models.Rating;
import com.myallpet.myallpet.Repository.RatingRepository;

@Service
public class RatingService {
    
    @Autowired
    private RatingRepository ratingRepository;

    public void saveRating(Rating rating) {
        ratingRepository.save(rating);
    }

    // Retrieve ratings given by a specific user
    public List<Rating> getRatingsByUserId(Long userId) {
        return ratingRepository.findByUserId(userId);
    }

    public List<Rating> getRatingsByTargetId(Long targetId) {
        return ratingRepository.findByTargetId(targetId);
    }

    public List<Rating> getRatingsByStars(int numberOfStars) {
        return ratingRepository.findByNumberOfStars(numberOfStars);
    }

    public List<Rating> getRecentRatings() {
        return ratingRepository.findAllByOrderByCreatedAtDesc();
    }

    public Optional<Rating> getRatingById(Long id) {
        return ratingRepository.findById(id);
    }

    public void deleteRating(Long id) {
        ratingRepository.deleteById(id);
    }
} 
