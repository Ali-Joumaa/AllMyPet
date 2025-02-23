package com.myallpet.myallpet.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.myallpet.myallpet.Models.Rating;

public interface RatingRepository extends JpaRepository<Rating,Long>{ 
   // Find all ratings for a specific user (either as rater or ratee)
   List<Rating> findByUserId(Long userId);

   // Find ratings by the specific target entity, assuming there's a targetId if ratings are for different types of targets
   List<Rating> findByTargetId(Long targetId);

   // Retrieve ratings with a specific number of stars
   List<Rating> findByNumberOfStars(int numberOfStars);

   // Additional custom query to retrieve recent ratings by date, if applicable
   List<Rating> findAllByOrderByCreatedAtDesc();
}   
