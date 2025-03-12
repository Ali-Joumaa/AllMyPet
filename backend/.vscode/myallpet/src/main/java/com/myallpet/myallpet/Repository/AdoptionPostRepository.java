package com.myallpet.myallpet.Repository;

import com.myallpet.myallpet.Models.AdoptionPost;

import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface AdoptionPostRepository extends JpaRepository<AdoptionPost, Long> {
    // You can define methods to find posts by status or type, e.g., findByStatus, findByAdoptionType

    List<AdoptionPost> findByUser_UserId(Long userId);

    // Find all adoption posts for a specific pet
    List<AdoptionPost> findByPetCard_PetId(Long petId);

    // Find adoption posts by status (e.g., Pending, Approved, Rejected)
    List<AdoptionPost> findByStatus(String status);

    // Find all adoption posts that are active and available
    List<AdoptionPost> findByStatusOrderByCreatedAtDesc(String status);
}
