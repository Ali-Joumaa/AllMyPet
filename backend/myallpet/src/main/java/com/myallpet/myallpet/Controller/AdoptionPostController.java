package com.myallpet.myallpet.Controller;

// import com.myallpet.myallpet.DTO.AdoptionPostDTO;
import com.myallpet.myallpet.Models.AdoptionPost;
import com.myallpet.myallpet.Service.AdoptionPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
// import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/adoption-posts")
public class AdoptionPostController {

    @Autowired
    private AdoptionPostService adoptionPostService;

    // Create a new adoption post
    @PostMapping
    public ResponseEntity<AdoptionPost> createAdoptionPost(@RequestBody AdoptionPost adoptionPost) {
        AdoptionPost savedPost = adoptionPostService.save(adoptionPost);
        return ResponseEntity.ok(savedPost);
    }

    // Get all adoption posts
    @GetMapping
    public ResponseEntity<List<AdoptionPost>> getAllAdoptionPosts() {
        List<AdoptionPost> posts = adoptionPostService.getAllAdoptionPosts();
        return ResponseEntity.ok(posts);
    }

    // Get adoption post by ID
    @GetMapping("/{id}")
    public ResponseEntity<AdoptionPost> getAdoptionPostById(@PathVariable Long id) {
        AdoptionPost post = adoptionPostService.getAdoptionPostById(id);
        return ResponseEntity.ok(post);
    }

    // Get adoption posts by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AdoptionPost>> getAdoptionPostsByUser(@PathVariable Long userId) {
        List<AdoptionPost> posts = adoptionPostService.getAdoptionPostsByUser(userId);
        return ResponseEntity.ok(posts);
    }

    // Get adoption posts by pet ID
    @GetMapping("/pet/{petId}")
    public ResponseEntity<List<AdoptionPost>> getAdoptionPostsByPet(@PathVariable Long petId) {
        List<AdoptionPost> posts = adoptionPostService.getAdoptionPostsByPet(petId);
        return ResponseEntity.ok(posts);
    }

    // Update an adoption post
    @PutMapping("/{id}")
    public ResponseEntity<AdoptionPost> updateAdoptionPost(@PathVariable Long id, @RequestBody AdoptionPost updatedPost) {
        AdoptionPost post = adoptionPostService.updateAdoptionPost(id, updatedPost);
        return ResponseEntity.ok(post);
    }

    // Delete an adoption post
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAdoptionPost(@PathVariable Long id) {
        adoptionPostService.deleteAdoptionPost(id);
        return ResponseEntity.ok("Adoption post deleted successfully.");
    }
}
