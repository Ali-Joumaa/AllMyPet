package com.myallpet.myallpet.Controller;

import com.myallpet.myallpet.DTO.FavoritesDTO;
import com.myallpet.myallpet.Models.Favorites;
import com.myallpet.myallpet.Models.PetCard;
import com.myallpet.myallpet.Models.User;
import com.myallpet.myallpet.Repository.FavoritesRepository;
import com.myallpet.myallpet.Repository.PetCardRepository;
import com.myallpet.myallpet.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/favorites")
public class FavoritesController {

    @Autowired
    private FavoritesRepository favoritesRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetCardRepository petCardRepository;

    @PostMapping("/add/{petId}")
    public ResponseEntity<?> addToFavorites(@PathVariable Long petId, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        PetCard pet = petCardRepository.findById(petId).orElseThrow();
    
        boolean exists = favoritesRepository
                .findByUser_UserId(user.getUserId())
                .stream()
                .anyMatch(f -> f.getPetCard().getPetId().equals(petId));
    
        if (exists) {
            // 🔁 Already exists? Just return success (no error)
            return ResponseEntity.ok("Already in favorites");
        }
    
        Favorites favorite = new Favorites();
        favorite.setUser(user);
        favorite.setPetCard(pet);
        favorite.setCreatedAt(LocalDateTime.now());
    
        favoritesRepository.save(favorite);
        return ResponseEntity.ok("Added to favorites");
    }
    @DeleteMapping("/remove/{petId}")
    public ResponseEntity<?> removeFromFavorites(@PathVariable Long petId, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();
    
        List<Favorites> favorites = favoritesRepository.findByUser_UserId(user.getUserId());
        favorites.stream()
            .filter(f -> f.getPetCard().getPetId().equals(petId))
            .findFirst()
            .ifPresent(favoritesRepository::delete);
    
        // 🔁 Even if it wasn't found, return 200 OK to prevent frontend error
        return ResponseEntity.ok("Removed from favorites");
    }

    @GetMapping("/my-favorites")
    public List<FavoritesDTO> getUserFavorites(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();
    
        return favoritesRepository.findByUser_UserId(user.getUserId()).stream().map(fav -> {
            PetCard pet = fav.getPetCard();
            FavoritesDTO dto = new FavoritesDTO();
            dto.setId(fav.getId());
            dto.setUserId(user.getUserId());
            dto.setPetId(pet.getPetId());
            dto.setPetName(pet.getName());
            dto.setImageUrl(pet.getPetPhoto());
            dto.setPetSpecies(pet.getSpecies());
            dto.setAdoptionPostStatus(pet.getStatus());
            dto.setBreed(pet.getBreed());
            dto.setSex(pet.getSex());
            dto.setAge(pet.getAge());
            dto.setLocation(pet.getLocation());
            dto.setDescription(pet.getDescription());
    
            // ✅ Add missing values
            dto.setVaccines(pet.getVaccines());
            dto.setHealthInfo(pet.getHealthInfo());
            dto.setUsername(pet.getUser().getUsername());
            dto.setPetPhoto(pet.getPetPhoto());  // Optional for consistency
            dto.setStatus(pet.getStatus());
    
            return dto;
        }).collect(Collectors.toList());
    }
}
