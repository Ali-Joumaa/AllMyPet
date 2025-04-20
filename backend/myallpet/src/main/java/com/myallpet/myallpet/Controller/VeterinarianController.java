package com.myallpet.myallpet.Controller;

import com.myallpet.myallpet.DTO.VeterinarianDTO;
import com.myallpet.myallpet.Models.Veterinarian;
import com.myallpet.myallpet.Service.VeterinarianService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

// Removed @CrossOrigin to avoid conflict with CorsConfig
@RestController
@RequestMapping("/vets")
public class VeterinarianController {

    @Autowired
    private VeterinarianService veterinarianService;

    @GetMapping
    public ResponseEntity<List<VeterinarianDTO>> getAllVeterinarians() {
        List<Veterinarian> vets = veterinarianService.getAllVeterinarians();

        List<VeterinarianDTO> dtos = vets.stream().map(vet -> {
            VeterinarianDTO dto = new VeterinarianDTO();
            dto.setVetId(vet.getVetId());
            dto.setFirstName(vet.getFirstName());
            dto.setLastName(vet.getLastName());
            dto.setEmail(vet.getEmail());
            dto.setExpYears(vet.getExp_years());
            dto.setSex(vet.getSex());
            dto.setLocation(vet.getLocation());
            dto.setProfilePicture(vet.getProfilePicture());
            dto.setPhoneNumber(vet.getPhoneNumber());
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    // Testing if Controller is receiving any requests
    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("Vet controller is alive!");
    }

    // Re-enabled DTO-based endpoint
    @PostMapping("/add")
    public ResponseEntity<VeterinarianDTO> createVeterinarian(@Valid @RequestBody VeterinarianDTO veterinarianDTO) {
        System.out.println("Received DTO: " + veterinarianDTO);

        Veterinarian savedVet = veterinarianService.createVeterinarianFromDTO(veterinarianDTO);

        VeterinarianDTO savedDto = new VeterinarianDTO();
        savedDto.setVetId(savedVet.getVetId());
        savedDto.setFirstName(savedVet.getFirstName());
        savedDto.setLastName(savedVet.getLastName());
        savedDto.setEmail(savedVet.getEmail());
        savedDto.setExpYears(savedVet.getExp_years());
        savedDto.setSex(savedVet.getSex());
        savedDto.setLocation(savedVet.getLocation());
        savedDto.setProfilePicture(savedVet.getProfilePicture());
        savedDto.setPhoneNumber(savedVet.getPhoneNumber());

        return ResponseEntity.ok(savedDto);
    }

    @GetMapping("/approved")
    public ResponseEntity<List<VeterinarianDTO>> getApprovedVeterinarians() {
        List<Veterinarian> approvedVets = veterinarianService.getApprovedVeterinarians();

        List<VeterinarianDTO> dtos = approvedVets.stream().map(vet -> {
            VeterinarianDTO dto = new VeterinarianDTO();
            dto.setVetId(vet.getVetId());
            dto.setFirstName(vet.getFirstName());
            dto.setLastName(vet.getLastName());
            dto.setEmail(vet.getEmail());
            dto.setExpYears(vet.getExp_years());
            dto.setSex(vet.getSex());
            dto.setLocation(vet.getLocation());
            dto.setProfilePicture(vet.getProfilePicture());
            dto.setPhoneNumber(vet.getPhoneNumber());
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

}