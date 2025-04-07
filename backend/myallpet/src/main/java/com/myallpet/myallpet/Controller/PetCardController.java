package com.myallpet.myallpet.Controller;


import com.myallpet.myallpet.DTO.PetCardDTO;
import com.myallpet.myallpet.Models.PetCard;
import com.myallpet.myallpet.Service.PetCardService;
import com.myallpet.myallpet.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
public class PetCardController {

    @Autowired
    private PetCardService petCardService;

    @Autowired
    private UserService userService;

    // ✅ **Create a Pet Card**
    @PostMapping("/create")
    public ResponseEntity<?> createPetCard(@RequestBody PetCardDTO petCardDTO, Authentication authentication)
     {
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
    petCard.getHealthInfo()
);
return ResponseEntity.ok(responseDTO); // ✅ safe to return

    }

    // // ✅ **Get All Pet Cards**
    // @GetMapping("/all")
    // public ResponseEntity<List<PetCard>> getAllPetCards() {
    //     List<PetCard> petCards = petCardService.getAllPetCards();
    //     return ResponseEntity.ok(petCards);
    // }

    @GetMapping("/all")
public ResponseEntity<List<PetCardDTO>> getAllPetCards() {
    List<PetCardDTO> petCards = petCardService.getAllPetCardDTOs();
    return ResponseEntity.ok(petCards);
}


    // ✅ **Get Pet Card by ID**
    @GetMapping("/{petId}")
    public ResponseEntity<?> getPetCardById(@PathVariable Long petId) {
        return petCardService.getPetCardById(petId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    

    // ✅ **Update Pet Card (Only Owner Can Update)**
    @PutMapping("/update/{petId}")
    public ResponseEntity<?> updatePetCard(@PathVariable Long petId, @RequestBody PetCardDTO petCardDTO, Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(petCardService.updatePetCard(petId, petCardDTO, username));
    }

    // ✅ **Delete Pet Card (Only Owner Can Delete)**
    @DeleteMapping("/delete/{petId}")
    public ResponseEntity<?> deletePetCard(@PathVariable Long petId, Authentication authentication) {
        String username = authentication.getName();
        petCardService.deletePetCard(petId, username);
        return ResponseEntity.ok("Pet card deleted successfully.");
    }

    @GetMapping("/mine")
    public ResponseEntity<List<PetCardDTO>> getMyPets(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        List<PetCardDTO> pets = petCardService.getPetCardsByUsername(username); // DTO
        return ResponseEntity.ok(pets);
    }
    
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
                pet.getHealthInfo()
        )).toList();
    
        return ResponseEntity.ok(dtoList);
    }
    



    
}