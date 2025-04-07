package com.myallpet.myallpet.Service;

import com.myallpet.myallpet.DTO.VeterinarianDTO;
import com.myallpet.myallpet.Models.Veterinarian;
import com.myallpet.myallpet.Repository.VeterinarianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VeterinarianService {

    @Autowired
    private VeterinarianRepository veterinarianRepository;

    // Fetch all vets from DB
    public List<Veterinarian> getAllVeterinarians() {
        return veterinarianRepository.findAll();
    }

    // Save a veterinarian object directly
    public Veterinarian saveVeterinarian(Veterinarian veterinarian) {
        return veterinarianRepository.save(veterinarian);
    }

    /**
     * Create and save a Veterinarian from a VeterinarianDTO
     */
    public Veterinarian createVeterinarianFromDTO(VeterinarianDTO dto) {
        // Map DTO fields to Entity fields
        Veterinarian veterinarian = new Veterinarian();
        veterinarian.setFirstName(dto.getFirstName());
        veterinarian.setLastName(dto.getLastName());
        veterinarian.setEmail(dto.getEmail());
        veterinarian.setExp_years(dto.getExpYears());
        veterinarian.setSex(dto.getSex());
        veterinarian.setLocation(dto.getLocation());
        veterinarian.setProfilePicture(dto.getProfilePicture());
        veterinarian.setPhoneNumber(dto.getPhoneNumber());

        // Persist the new veterinarian
        return veterinarianRepository.save(veterinarian);
    }
}