package com.myallpet.myallpet.Controller;

import com.myallpet.myallpet.Models.User;
import com.myallpet.myallpet.Models.PetCard;
import com.myallpet.myallpet.DTO.UserDTO;
import com.myallpet.myallpet.Models.AdoptionPost;
import com.myallpet.myallpet.Repository.UserRepository;

import jakarta.annotation.security.RolesAllowed;

import com.myallpet.myallpet.Repository.PetCardRepository;
import com.myallpet.myallpet.Repository.AdoptionPostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetCardRepository petCardRepository;

    @Autowired
    private AdoptionPostRepository adoptionPostRepository;

    // Get all users
    @GetMapping("/users")
    @RolesAllowed("ADMIN")
    public ResponseEntity<List<UserDTO>> getAllNonAdminUsers() {
    List<User> users = userRepository.findAllByRoleNot("ADMIN");
    List<UserDTO> userDTOs = users.stream().map(UserDTO::new).toList();
    return ResponseEntity.ok(userDTOs);
}

    // Get pet cards for a specific user
    @RolesAllowed("ADMIN")
    @GetMapping("/users/{userId}/pets")
    public List<PetCard> getUserPets(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return petCardRepository.findByUser(user);
    }

    // Get adoption posts for a specific user
    @RolesAllowed("ADMIN")
    @GetMapping("/users/{userId}/adoptions")
    public List<AdoptionPost> getUserAdoptions(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return adoptionPostRepository.findByUser(user);
    }

    // Delete a user (optional: cascade delete)
    @RolesAllowed("ADMIN")
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        userRepository.deleteById(userId);
        return ResponseEntity.ok("User deleted successfully.");
    }

    // Delete pet card
    @RolesAllowed("ADMIN")
    @DeleteMapping("/pets/{petId}")
    public ResponseEntity<?> deletePet(@PathVariable Long petId) {
        petCardRepository.deleteById(petId);
        return ResponseEntity.ok("Pet deleted successfully.");
    }

    // Delete adoption post
    @RolesAllowed("ADMIN")
    @DeleteMapping("/adoptions/{adoptionId}")
    public ResponseEntity<?> deleteAdoption(@PathVariable Long adoptionId) {
        adoptionPostRepository.deleteById(adoptionId);
        return ResponseEntity.ok("Adoption post deleted successfully.");
    }

    // Update pet card (standard PUT update)
    @RolesAllowed("ADMIN")
    @PutMapping("/pets/{petId}")
    public ResponseEntity<?> updatePet(@PathVariable Long petId, @RequestBody PetCard updatedPet) {
        PetCard pet = petCardRepository.findById(petId).orElseThrow();
        updatedPet.setPetId(pet.getPetId());
        petCardRepository.save(updatedPet);
        return ResponseEntity.ok("Pet updated successfully.");
    }

    // Update adoption post
    @RolesAllowed("ADMIN")
    @PutMapping("/adoptions/{adoptionId}")
    public ResponseEntity<?> updateAdoption(@PathVariable Long adoptionId, @RequestBody AdoptionPost updatedAdoption) {
        AdoptionPost existingPost = adoptionPostRepository.findById(adoptionId).orElseThrow();
    
        // Preserve user and petCard from the existing post
        updatedAdoption.setPostId(existingPost.getPostId());
        updatedAdoption.setUser(existingPost.getUser());
        updatedAdoption.setPetCard(existingPost.getPetCard());
        updatedAdoption.setCreatedAt(existingPost.getCreatedAt());
    
        adoptionPostRepository.save(updatedAdoption);
        return ResponseEntity.ok("Adoption post updated successfully.");
    }
    
}
