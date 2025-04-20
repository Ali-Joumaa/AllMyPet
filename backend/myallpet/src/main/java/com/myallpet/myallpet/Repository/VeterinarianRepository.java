package com.myallpet.myallpet.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.myallpet.myallpet.Models.Veterinarian;

public interface VeterinarianRepository extends JpaRepository<Veterinarian, Long> {

    List<Veterinarian> findAll();

    Veterinarian findByEmail(String email);

    List<Veterinarian> findByLocation(String location);

    // fetch only approved vets (used by public/frontend)
    List<Veterinarian> findByApprovedTrue();

    // fetch unapproved vets (admin dashboard)
    List<Veterinarian> findByApprovedFalse();
}