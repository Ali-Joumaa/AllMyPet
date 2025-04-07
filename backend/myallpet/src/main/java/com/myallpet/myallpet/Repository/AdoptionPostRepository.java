package com.myallpet.myallpet.Repository;

import com.myallpet.myallpet.Models.AdoptionPost;
import com.myallpet.myallpet.Models.PetCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdoptionPostRepository extends JpaRepository<AdoptionPost, Long> {

    List<AdoptionPost> findByUser_UserId(Long userId);

    List<AdoptionPost> findByStatus(String status);

    List<AdoptionPost> findByPetCard_PetId(Long petId);

    List<AdoptionPost> findByStatusOrderByCreatedAtDesc(String status);

    void deleteByPetCard(PetCard petCard); 
}
