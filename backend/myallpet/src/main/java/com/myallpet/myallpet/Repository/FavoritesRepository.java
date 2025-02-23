package com.myallpet.myallpet.Repository;

import com.myallpet.myallpet.Models.Favorites;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorites, Long> {
    // Potential custom methods: findByUserId, findByPetId, find all favorites for a particular user, etc.
}

