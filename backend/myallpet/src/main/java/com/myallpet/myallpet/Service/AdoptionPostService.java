package com.myallpet.myallpet.Service;

import com.myallpet.myallpet.Models.AdoptionPost;
import com.myallpet.myallpet.Repository.AdoptionPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AdoptionPostService {

    @Autowired
    private AdoptionPostRepository adoptionPostRepository;

    public AdoptionPost save(AdoptionPost adoptionPost) {
        return adoptionPostRepository.save(adoptionPost);
    }

    public List<AdoptionPost> getAllAdoptionPosts() {
        return adoptionPostRepository.findAll();
    }

    public AdoptionPost getAdoptionPostById(Long id) {
        return adoptionPostRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public List<AdoptionPost> getAdoptionPostsByUser(Long userId) {
        return adoptionPostRepository.findByUser_UserId(userId);
    }

    public List<AdoptionPost> getAdoptionPostsByPet(Long petId) {
        return adoptionPostRepository.findByPetCard_PetId(petId);
    }

    public AdoptionPost updateAdoptionPost(Long id, AdoptionPost updatedPost) {
        Optional<AdoptionPost> existingPost = adoptionPostRepository.findById(id);
        if (existingPost.isPresent()) {
            AdoptionPost post = existingPost.get();
            post.setTitle(updatedPost.getTitle());
            post.setDescription(updatedPost.getDescription());
            post.setStatus(updatedPost.getStatus());
            post.setAdoptionType(updatedPost.getAdoptionType());
            return adoptionPostRepository.save(post);
        } else {
            throw new RuntimeException("Post not found");
        }
    }

    public void deleteAdoptionPost(Long id) {
        adoptionPostRepository.deleteById(id);
    }
}
