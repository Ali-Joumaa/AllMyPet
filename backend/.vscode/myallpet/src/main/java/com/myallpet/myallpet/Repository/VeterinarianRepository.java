package com.myallpet.myallpet.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.myallpet.myallpet.Models.Veterinarian;

public interface VeterinarianRepository extends JpaRepository<Veterinarian, Long> {
    List<Veterinarian> findAll();

    // Find a veterinarian by email, often used to avoid duplicate submissions
    Veterinarian findByEmail(String email);

    // Optionally, find veterinarians by location or specialization, if such fields are included
    List<Veterinarian> findByLocation(String location);
}  
     
