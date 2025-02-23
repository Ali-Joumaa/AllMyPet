package com.myallpet.myallpet.Repository;

import com.myallpet.myallpet.Models.AdoptionPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdoptionPostRepository extends JpaRepository<AdoptionPost, Long> {
    // You can define methods to find posts by status or type, e.g., findByStatus, findByAdoptionType
}
