package com.myallpet.myallpet.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "adoption_posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdoptionPost{

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "petId", nullable = false)
    private PetCard petCard;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 100, message = "Title must be between 3 and 100 characters")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 1000, message = "Description must be between 10 and 1000 characters")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @NotBlank(message = "Adoption type is required")
    @Size(min = 3, max = 50, message = "Adoption type must be between 3 and 50 characters")
    @Pattern(regexp = "Temporary|Permanent", message = "Adoption must be Temporary or Permanent")
    @Column(nullable = false)
    private String adoptionType;

    @NotBlank(message = "Status is required")
    @Size(min = 3, max = 20, message = "Status must be between 3 and 20 characters")
    @Column(nullable = false)
    private String status;

    @Column(nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;
    
}