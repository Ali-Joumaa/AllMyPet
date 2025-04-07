package com.myallpet.myallpet.Repository;

import com.myallpet.myallpet.Models.Favorites;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorites, Long> {
    // Potential custom methods: findByUserId, findByPetId, find all favorites for a particular user, etc.

    List<Favorites> findByUser_UserId(Long userId);

    // // Check if a specific adoption post is favorited by a specific user
    // boolean existsByUser_UserIdAndPostId(Long userId, Long adoptionPostId);

    // // Remove a favorite entry
    // void deleteByUserIdAndAdoptionPostId(Long userId, Long adoptionPostId);
    void deleteByPetCard_PetId(Long petId);
}

