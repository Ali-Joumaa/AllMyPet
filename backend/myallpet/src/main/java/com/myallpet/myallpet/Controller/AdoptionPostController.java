package com.myallpet.myallpet.Controller;

import com.myallpet.myallpet.DTO.AdoptionPostDTO;
import com.myallpet.myallpet.DTO.UserDTO;
import com.myallpet.myallpet.Models.AdoptionPost;
import com.myallpet.myallpet.Models.PetCard;
import com.myallpet.myallpet.Models.User;
import com.myallpet.myallpet.Repository.PetCardRepository;
import com.myallpet.myallpet.Repository.UserRepository;
import com.myallpet.myallpet.Service.AdoptionPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/adoption-posts")
public class AdoptionPostController {

    @Autowired
    private AdoptionPostService adoptionPostService;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PetCardRepository petCardRepository;

    @PostMapping
public ResponseEntity<AdoptionPostDTO> createAdoptionPost(
        @RequestBody AdoptionPostDTO dto,
        @AuthenticationPrincipal UserDetails userDetails
) {
    User user = userRepository.findByUsername(userDetails.getUsername())
        .orElseThrow(() -> new RuntimeException("User not found"));

    PetCard petCard = petCardRepository.findById(dto.getPetId())
        .orElseThrow(() -> new RuntimeException("Pet not found"));

    AdoptionPost post = new AdoptionPost();
    post.setTitle(dto.getTitle());
    post.setDescription(dto.getDescription());
    post.setStatus(dto.getStatus());
    post.setAdoptionType(dto.getAdoptionType());
    post.setUser(user);
    post.setPetCard(petCard);
    post.setCreatedAt(java.time.LocalDateTime.now());
    
    AdoptionPost savedPost = adoptionPostService.save(post);

    // ✅ Reuse your existing method to return a consistent response
    return ResponseEntity.ok(convertToDTO(savedPost));
}


    // Get all adoption posts
    @GetMapping
    public ResponseEntity<List<AdoptionPostDTO>> getAllAdoptionPosts() {
        List<AdoptionPost> posts = adoptionPostService.getAllAdoptionPosts();
        List<AdoptionPostDTO> dtos = posts.stream().map(this::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // Get adoption post by ID
    @GetMapping("/{id}")
    public ResponseEntity<AdoptionPostDTO> getAdoptionPostById(@PathVariable Long id) {
        AdoptionPost post = adoptionPostService.getAdoptionPostById(id);
        return ResponseEntity.ok(convertToDTO(post));
    }

    // Get adoption posts by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AdoptionPostDTO>> getAdoptionPostsByUser(@PathVariable Long userId) {
        List<AdoptionPost> posts = adoptionPostService.getAdoptionPostsByUser(userId);
        List<AdoptionPostDTO> dtos = posts.stream().map(this::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // Get adoption posts by pet ID
    @GetMapping("/pet/{petId}")
    public ResponseEntity<List<AdoptionPostDTO>> getAdoptionPostsByPet(@PathVariable Long petId) {
        List<AdoptionPost> posts = adoptionPostService.getAdoptionPostsByPet(petId);
        List<AdoptionPostDTO> dtos = posts.stream().map(this::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdoptionPostDTO> updateAdoptionPost(@PathVariable Long id, @RequestBody AdoptionPost updatedPost) {
        AdoptionPost post = adoptionPostService.updateAdoptionPost(id, updatedPost);
        return ResponseEntity.ok(convertToDTO(post)); // ✅ This solves the problem
    }
    

    // Delete an adoption post
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAdoptionPost(@PathVariable Long id) {
        adoptionPostService.deleteAdoptionPost(id);
        return ResponseEntity.ok("Adoption post deleted successfully.");
    }

    // Helper method to convert to DTO
    private AdoptionPostDTO convertToDTO(AdoptionPost post) {
    AdoptionPostDTO dto = new AdoptionPostDTO();
    dto.setId(post.getPostId());
    dto.setUserId(post.getUser().getUserId());

    // ✅ Set user object with username
    UserDTO userDTO = new UserDTO();
    userDTO.setUsername(post.getUser().getUsername()); 

    userDTO.setProfilePictureURL(post.getUser().getUserProfilePicture()); 
    dto.setUser(userDTO);

    dto.setPetId(post.getPetCard().getPetId());
    dto.setImageUrl(post.getPetCard().getPetPhoto());
    dto.setTitle(post.getTitle());
    dto.setDescription(post.getDescription());
    dto.setStatus(post.getStatus());
    dto.setAdoptionType(post.getAdoptionType());
    dto.setPostedDate(post.getCreatedAt().toLocalDate());

    dto.setPetName(post.getPetCard().getName());
    dto.setPetSpecies(post.getPetCard().getSpecies());
    dto.setPetBreed(post.getPetCard().getBreed());
    dto.setImageUrl(post.getPetCard().getPetPhoto());

    return dto;
}

}
