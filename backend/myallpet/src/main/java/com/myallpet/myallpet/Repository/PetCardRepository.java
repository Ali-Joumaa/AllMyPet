package com.myallpet.myallpet.Repository;

import com.myallpet.myallpet.Models.PetCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetCardRepository extends JpaRepository<PetCard, Long> {
    // Custom methods can be added here if needed, e.g., findBySpecies, findByStatus, etc.
}