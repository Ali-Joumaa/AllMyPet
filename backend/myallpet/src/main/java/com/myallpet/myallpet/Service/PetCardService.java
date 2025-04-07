package com.myallpet.myallpet.Service;

import com.myallpet.myallpet.DTO.PetCardDTO;
import com.myallpet.myallpet.Models.AdoptionPost;
import com.myallpet.myallpet.Models.PetCard;
import com.myallpet.myallpet.Models.User;
import com.myallpet.myallpet.Repository.AdoptionPostRepository;
import com.myallpet.myallpet.Repository.FavoritesRepository;
import com.myallpet.myallpet.Repository.PetCardRepository;
import com.myallpet.myallpet.Repository.UserRepository;
import com.myallpet.myallpet.exception.OurException;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PetCardService {
    @Autowired
    private FavoritesRepository favoritesRepository;
    @Autowired
    private PetCardRepository petCardRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdoptionPostRepository adoptionPostRepository;

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
        petCard.setDescription(petCardDTO.getDescription());
        petCard.setVaccines(petCardDTO.getVaccines());
        petCard.setHealthInfo(petCardDTO.getHealthInfo());
        petCard.setLocation(petCardDTO.getLocation());
        petCard.setStatus("Available");

        return petCardRepository.save(petCard);
    }

    // // ✅ **Get All Pet Cards**
    // public List<PetCard> getAllPetCards() {
    //     return petCardRepository.findAll();
    // }

    public List<PetCardDTO> getAllPetCardDTOs() {
        List<PetCard> pets = petCardRepository.findAll();
        return pets.stream()
                   .map(this::convertToDTO)
                   .collect(Collectors.toList());
    }
    

    public Optional<PetCard> getPetCardById(Long petId) {
        return petCardRepository.findById(petId);
    }

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
        petCard.setVaccines(petCardDTO.getVaccines());
        petCard.setHealthInfo(petCardDTO.getHealthInfo());
        petCard.setDescription(petCardDTO.getDescription());
        petCard.setLocation(petCardDTO.getLocation());

        return petCardRepository.save(petCard);
    }

    @Transactional
    public void deletePetCard(Long petId, String username) {
        PetCard pet = petCardRepository.findById(petId)
                .orElseThrow(() -> new RuntimeException("Pet not found"));
    
        if (!pet.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized to delete this pet.");
        }
        favoritesRepository.deleteByPetCard_PetId(petId);
        petCardRepository.delete(pet); // No need to manually delete adoption posts
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
            pet.getUser().getUserId(),
            pet.getVaccines(),
            pet.getHealthInfo(),
            pet.getUser().getUsername()
        );
    }

    public List<PetCard> getPetEntitiesByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return petCardRepository.findByUser(user);
    }
}