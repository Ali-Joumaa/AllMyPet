package com.myallpet.myallpet.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.myallpet.myallpet.Models.Veterinarian;
import com.myallpet.myallpet.Repository.VeterinarianRepository;

public class VeterinarianService {
    
    @Autowired
    private VeterinarianRepository veterinarianRepository;

    public List<Veterinarian> getAllVeterinarians() {
        return veterinarianRepository.findAll();
    }

    public Veterinarian saveVeterinarian(Veterinarian veterinarian) {
        return veterinarianRepository.save(veterinarian);
    }
}
