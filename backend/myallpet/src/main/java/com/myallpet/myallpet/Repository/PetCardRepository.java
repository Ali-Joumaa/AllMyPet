package com.myallpet.myallpet.Repository;

import com.myallpet.myallpet.Models.PetCard;
import com.myallpet.myallpet.Models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetCardRepository extends JpaRepository<PetCard, Long> {

    List<PetCard> findByUser(User user);

    List<PetCard> findBySpecies(String species);

    List<PetCard> findByStatus(String status);

    List<PetCard> findByBreed(String breed);
    
    List<PetCard> findByAgeLessThanEqual(int age);
    
}