package com.myallpet.myallpet.Controller;

import com.myallpet.myallpet.Models.User;
import com.myallpet.myallpet.Models.PetCard;
import com.myallpet.myallpet.DTO.UserDTO;
import com.myallpet.myallpet.Models.AdoptionPost;
import com.myallpet.myallpet.Repository.UserRepository;

import jakarta.annotation.security.RolesAllowed;
import jakarta.transaction.Transactional;

import com.myallpet.myallpet.Repository.PetCardRepository;
import com.myallpet.myallpet.Repository.AdoptionPostRepository;
import com.myallpet.myallpet.Repository.FavoritesRepository;
import com.myallpet.myallpet.Models.Veterinarian;
import com.myallpet.myallpet.Repository.VeterinarianRepository;

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
    private FavoritesRepository  favoritesRepository;

    @Autowired
    private AdoptionPostRepository adoptionPostRepository;

    @Autowired
    private VeterinarianRepository veterinarianRepository;

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

    @DeleteMapping("/users/{userId}")
    @RolesAllowed("ADMIN")
    @Transactional
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // 🛑 Step 1: Get all the PetCards owned by this user
        List<PetCard> userPets = petCardRepository.findByUser(user);

        // 🛑 Step 2: For each pet, delete related favorites
        for (PetCard pet : userPets) {
            favoritesRepository.deleteByPetCard(pet);
        }

        // 🛑 Step 3: Delete the user's pets
        petCardRepository.deleteAll(userPets);

        // 🛑 Step 4: Delete the user
        userRepository.delete(user);

        return ResponseEntity.ok("User and related data deleted successfully.");
    }



    // AdminController.java

@RolesAllowed("ADMIN")
@DeleteMapping("/pets/{petId}")
@Transactional // ✅ Important to make sure multiple operations happen together
public ResponseEntity<?> deletePet(@PathVariable Long petId) {
    // Step 1: Delete any favorites referring to this pet first
    favoritesRepository.deleteByPetCard_PetId(petId);

    // Step 2: Now safe to delete the pet card itself
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
    @PreAuthorize("hasRole('ADMIN')")
        @PutMapping("/pets/{petId}")
    public ResponseEntity<?> updatePet(@PathVariable Long petId, @RequestBody PetCard updatedPet) {
        PetCard pet = petCardRepository.findById(petId).orElseThrow();
    
        if (updatedPet.getName() != null) pet.setName(updatedPet.getName());
        if (updatedPet.getSpecies() != null) pet.setSpecies(updatedPet.getSpecies());
        if (updatedPet.getBreed() != null) pet.setBreed(updatedPet.getBreed());
        if (updatedPet.getAge() != null) pet.setAge(updatedPet.getAge());
        if (updatedPet.getSex() != null) pet.setSex(updatedPet.getSex());
        if (updatedPet.getPetPhoto() != null) pet.setPetPhoto(updatedPet.getPetPhoto());
        if (updatedPet.getDescription() != null) pet.setDescription(updatedPet.getDescription());
        if (updatedPet.getLocation() != null) pet.setLocation(updatedPet.getLocation());
        if (updatedPet.getStatus() != null) pet.setStatus(updatedPet.getStatus());
        if (updatedPet.getVaccines() != null) pet.setVaccines(updatedPet.getVaccines());
        if (updatedPet.getHealthInfo() != null) pet.setHealthInfo(updatedPet.getHealthInfo());
    
        petCardRepository.save(pet);
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

    @RolesAllowed("ADMIN")
    @PutMapping("/approve-vet/{vetId}")
    public ResponseEntity<?> approveVet(@PathVariable Long vetId) {
        return veterinarianRepository.findById(vetId).map(vet -> {
            vet.setApproved(true);
            veterinarianRepository.save(vet);
            return ResponseEntity.ok("Veterinarian approved successfully.");
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }


    // Get all veterinarian requests (those not yet approved)
    @RolesAllowed("ADMIN")
    @GetMapping("/vets/requests")
    public ResponseEntity<List<Veterinarian>> getPendingVetRequests() {
        List<Veterinarian> pendingVets = veterinarianRepository.findByApprovedFalse();
        return ResponseEntity.ok(pendingVets);
    }
    // Get single user info
    @RolesAllowed("ADMIN")
    @GetMapping("/users/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(new UserDTO(user));
    }

    @RolesAllowed("ADMIN")
    @PutMapping("/users/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Long userId, @RequestBody User updatedUser) {
        User existingUser = userRepository.findById(userId).orElseThrow();
    
        if (updatedUser.getFirstname() != null) {
            existingUser.setFirstname(updatedUser.getFirstname());
        }
        if (updatedUser.getLastname() != null) {
            existingUser.setLastname(updatedUser.getLastname());
        }
        if (updatedUser.getBio() != null) {
            existingUser.setBio(updatedUser.getBio());
        }
        if (updatedUser.getYearsPetting() != null) {
            existingUser.setYearsPetting(updatedUser.getYearsPetting());
        }
        if (updatedUser.getAddress() != null) {
            existingUser.setAddress(updatedUser.getAddress());
        }
        if (updatedUser.getUserProfilePicture() != null) {
            System.out.println("🔍 New profile picture: " + updatedUser.getUserProfilePicture());
            existingUser.setUserProfilePicture(updatedUser.getUserProfilePicture());
        }
        
    
        userRepository.save(existingUser);
    
        return ResponseEntity.ok("User updated successfully.");
    }
    


}
