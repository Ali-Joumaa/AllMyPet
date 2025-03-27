package com.myallpet.myallpet.Service;


import com.myallpet.myallpet.DTO.PetCardDTO;
import com.myallpet.myallpet.Models.PetCard;
import com.myallpet.myallpet.Models.User;
import com.myallpet.myallpet.Repository.PetCardRepository;
import com.myallpet.myallpet.Repository.UserRepository;
import com.myallpet.myallpet.exception.OurException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PetCardService {

    @Autowired
    private PetCardRepository petCardRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ **Create Pet Card**
    public PetCard createPetCard(PetCardDTO petCardDTO, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new OurException("User not found"));

        PetCard petCard = new PetCard();
        petCard.setUser(user);
        petCard.setName(petCardDTO.getName());
        petCard.setSpecies(petCardDTO.getSpecies());
        petCard.setBreed(petCardDTO.getBreed());
        petCard.setAge(petCardDTO.getAge());
        petCard.setSex(petCardDTO.getSex());
        petCard.setPetPhoto(petCardDTO.getPetPhoto());

        // petCard.setVaccines(petCardDTO.getVaccines());
        // petCard.setHealthInfo(petCardDTO.getHealthInfo());
        petCard.setLocation(petCardDTO.getLocation());
        petCard.setStatus("Available");

        return petCardRepository.save(petCard);
    }

    // ✅ **Get All Pet Cards**
    public List<PetCard> getAllPetCards() {
        return petCardRepository.findAll();
    }

    // ✅ **Get Pet Card by ID**
    public Optional<PetCard> getPetCardById(Long petId) {
        return petCardRepository.findById(petId);
    }

    // ✅ **Update Pet Card (Only Owner Can Update)**
    public PetCard updatePetCard(Long petId, PetCardDTO petCardDTO, String username) {
        PetCard petCard = petCardRepository.findById(petId)
                .orElseThrow(() -> new OurException("Pet card not found"));

        if (!petCard.getUser().getUsername().equals(username)) {
            throw new OurException("Unauthorized: You can only update your own pet cards.");
        }

        petCard.setName(petCardDTO.getName());
        petCard.setSpecies(petCardDTO.getSpecies());
        petCard.setBreed(petCardDTO.getBreed());
        petCard.setAge(petCardDTO.getAge());
        petCard.setSex(petCardDTO.getSex());
        petCard.setPetPhoto(petCardDTO.getPetPhoto());
        // petCard.setVaccines(petCardDTO.getVaccines());
        // petCard.setHealthInfo(petCardDTO.getHealthInfo());
        petCard.setLocation(petCardDTO.getLocation());

        return petCardRepository.save(petCard);
    }

    // ✅ **Delete Pet Card (Only Owner Can Delete)**
    public void deletePetCard(Long petId, String username) {
        PetCard petCard = petCardRepository.findById(petId)
                .orElseThrow(() -> new OurException("Pet card not found"));

        if (!petCard.getUser().getUsername().equals(username)) {
            throw new OurException("Unauthorized: You can only delete your own pet cards.");
        }

        petCardRepository.delete(petCard);
    }


    public List<PetCardDTO> getPetCardsByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<PetCard> petCards = petCardRepository.findByUser(user);

        return petCards.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private PetCardDTO convertToDTO(PetCard pet) {
        return new PetCardDTO(
            pet.getPetId(),
            pet.getName(),
            pet.getSpecies(),
            pet.getBreed(),
            pet.getAge(),
            pet.getSex(),
            pet.getPetPhoto(),
            pet.getDescription(),
            pet.getLocation(),
            pet.getStatus(),
            pet.getUser().getUserId()
        );
    }
    public List<PetCard> getPetEntitiesByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    
        return petCardRepository.findByUser(user);
    }
    
    
}