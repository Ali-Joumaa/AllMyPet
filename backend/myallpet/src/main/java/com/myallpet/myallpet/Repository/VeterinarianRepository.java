package com.myallpet.myallpet.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.myallpet.myallpet.Models.Veterinarian;

public interface VeterinarianRepository extends JpaRepository<Veterinarian, Long> {
}  
    
