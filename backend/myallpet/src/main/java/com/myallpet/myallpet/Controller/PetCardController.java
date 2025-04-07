package com.myallpet.myallpet.Controller;

import com.myallpet.myallpet.DTO.PetCardDTO;
import com.myallpet.myallpet.Models.PetCard;
import com.myallpet.myallpet.Service.PetCardService;
import com.myallpet.myallpet.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pets")
public class PetCardController {

    @Autowired
    private PetCardService petCardService;

    @Autowired
    private UserService userService;

    // ✅ Create a Pet Card
    @PostMapping("/create")
    public ResponseEntity<?> createPetCard(@RequestBody PetCardDTO petCardDTO, Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            System.out.println("🚨 Unauthorized Request: No Authentication Provided.");
            return ResponseEntity.status(403).body("Unauthorized: No authentication provided.");
        }

        String username = authentication.getName();
        System.out.println("✅ Authenticated User: " + username);

        PetCard petCard = petCardService.createPetCard(petCardDTO, username);
        PetCardDTO responseDTO = new PetCardDTO(
                petCard.getPetId(),
                petCard.getName(),
                petCard.getSpecies(),
                petCard.getBreed(),
                petCard.getAge(),
                petCard.getSex(),
                petCard.getPetPhoto(),
                petCard.getDescription(),
                petCard.getLocation(),
                petCard.getStatus(),
                petCard.getUser().getUserId(),
                petCard.getVaccines(),
                petCard.getHealthInfo(),
                petCard.getUser().getUsername()
        );
        return ResponseEntity.ok(responseDTO);
    }

    // // ✅ **Get All Pet Cards**
    // @GetMapping("/all")
    // public ResponseEntity<List<PetCard>> getAllPetCards() {
    //     List<PetCard> petCards = petCardService.getAllPetCards();
    //     return ResponseEntity.ok(petCards);
    // }

    // ✅ Get All Pet Cards
    @GetMapping("/all")
public ResponseEntity<List<PetCardDTO>> getAllPetCards() {
    List<PetCardDTO> petCards = petCardService.getAllPetCardDTOs();
    return ResponseEntity.ok(petCards);
}


    // ✅ Get Pet Card by ID (for edit form)
    @GetMapping("/{petId}")
    public ResponseEntity<?> getPetCardById(@PathVariable Long petId) {
        Optional<PetCard> optionalPetCard = petCardService.getPetCardById(petId);
        if (optionalPetCard.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        PetCard pet = optionalPetCard.get();
        PetCardDTO dto = new PetCardDTO(
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
        return ResponseEntity.ok(dto);
    }

    // ✅ Update Pet Card
    @PutMapping("/update/{petId}")
    public ResponseEntity<?> updatePetCard(@PathVariable Long petId, @RequestBody PetCardDTO petCardDTO, Authentication authentication) {
        String username = authentication.getName();
        PetCard updatedPet = petCardService.updatePetCard(petId, petCardDTO, username);

        PetCardDTO updatedPetDTO = new PetCardDTO(
                updatedPet.getPetId(),
                updatedPet.getName(),
                updatedPet.getSpecies(),
                updatedPet.getBreed(),
                updatedPet.getAge(),
                updatedPet.getSex(),
                updatedPet.getPetPhoto(),
                updatedPet.getDescription(),
                updatedPet.getLocation(),
                updatedPet.getStatus(),
                updatedPet.getUser().getUserId(),
                updatedPet.getVaccines(),
                updatedPet.getHealthInfo(),
                updatedPet.getUser().getUsername()
        );

        return ResponseEntity.ok(updatedPetDTO);
    }

    // ✅ Delete Pet Card (Only Owner Can Delete)
    @DeleteMapping("/delete/{petId}")
    public ResponseEntity<?> deletePetCard(@PathVariable Long petId, Authentication authentication) {
        String username = authentication.getName();
        petCardService.deletePetCard(petId, username);
        return ResponseEntity.ok("Pet card deleted successfully.");
    }

    // ✅ Get My Pets (with DTO conversion)
    @GetMapping("/mine")
    public ResponseEntity<List<PetCardDTO>> getMyPets(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        List<PetCardDTO> pets = petCardService.getPetCardsByUsername(username);
        return ResponseEntity.ok(pets);
    }

    // ✅ Get My Pets for Authenticated User
    @GetMapping("/myPets")
    public ResponseEntity<List<PetCardDTO>> getMyPetCards(Authentication authentication) {
        String username = authentication.getName();
        System.out.println("Authenticated user: " + username);

        List<PetCard> petCards = petCardService.getPetEntitiesByUsername(username);

        if (petCards == null || petCards.isEmpty()) {
            System.out.println("⚠️ No pet cards found for user: " + username);
        } else {
            System.out.println("✅ Found " + petCards.size() + " pet cards:");
        }

        List<PetCardDTO> dtoList = petCards.stream().map(pet -> new PetCardDTO(
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
        )).toList();

        return ResponseEntity.ok(dtoList);
    }

    // ✅ Get Pets of Any User by Username (only if authenticated)
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/userPets/{username}")
    public ResponseEntity<List<PetCardDTO>> getUserPetsByUsername(@PathVariable String username) {
        List<PetCard> petCards = petCardService.getPetEntitiesByUsername(username);

        if (petCards == null || petCards.isEmpty()) {
            System.out.println("⚠️ No pet cards found for user: " + username);
        } else {
            System.out.println("✅ Found " + petCards.size() + " pet cards for user: " + username);
        }

        List<PetCardDTO> dtoList = petCards.stream().map(pet -> new PetCardDTO(
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
        )).toList();

        return ResponseEntity.ok(dtoList);
    }
}
