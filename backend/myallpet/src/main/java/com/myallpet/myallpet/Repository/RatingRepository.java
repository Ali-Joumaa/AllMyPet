package com.myallpet.myallpet.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.myallpet.myallpet.Models.Rating;

public interface RatingRepository extends JpaRepository<Rating,Long>{ 
}  
