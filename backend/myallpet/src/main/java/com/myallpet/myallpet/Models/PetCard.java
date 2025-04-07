package com.myallpet.myallpet.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(name = "pet_cards")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PetCard {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
  
      private Long petId;

      @ManyToOne(fetch = FetchType.LAZY)
      @JoinColumn(name = "userId", nullable = false)
      private User user;

      @NotBlank(message="name is required")
      @Size(min = 1, max = 50, message = "Pet name should be between 1 and 50 characters")
      @Column(nullable=false)
      private String name;


      @NotBlank(message = "Species is required")
      @Column(nullable = false)
      private String species;

      @Size(max = 30 , message = "Breed can be up to 30 characters")
      private String breed;

      @Min(value = 0, message = "Age must be greater than or equal to 0")
      @Column(nullable = false)
      private Integer age;


      @Pattern(regexp = "Male|Female|Other", message = "Sex must be Male, Female, or Other")
      @Column(nullable = false)
      private String sex;

      private String petPhoto;

      @OneToMany(mappedBy = "petCard", cascade = CascadeType.ALL, orphanRemoval = true)
@JsonIgnore // prevent infinite recursion during JSON serialization
private java.util.List<AdoptionPost> adoptionPosts;


      @Size(max = 2000, message = "Description cannot be longer than 2000 characters")
      private String description;

      @Size(max = 1000, message = "Vaccines information cannot be longer than 1000 characters")
      private String vaccines;

      @Size(max = 1000, message = "Health info cannot be longer than 1000 characters")
      private String healthInfo;

      @Size(max = 100, message = "Location cannot be longer than 100 characters")
      private String location;

      @NotBlank(message = "Status is required")
      @Size(max = 20, message = "Status cannot be longer than 20 characters")
      @Column(nullable = false)
      private String status;

      @Column(nullable = false, updatable = false)
      private LocalDateTime createdAt = LocalDateTime.now();
}
