package com.myallpet.myallpet.Models;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    @Column(unique = true, nullable = false)
    private String username;

    @NotBlank(message ="Email is required")
    @Email(message = "Invalid email format")
    @Size(min = 5, max = 100, message = "Email must be between 5 and 100 characters")
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank(message = "Password is required")
    // @Size(min=8, message = "Password must be at least 8 characters")
    // @Pattern(
    //     regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$",
    //     message = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    // )
    @Column(nullable = false)
    @JsonIgnore
    private String password;

    @NotBlank(message = "First Name is required")
    @Size(min = 2, max = 30, message = "First Name must be between 2 and 50 characters")
    @Column(name = "firstname", nullable = false)
    private String firstname;

    @NotBlank(message = "Last Name is required")
    @Size(min = 2, max = 30, message = "Last Name must be between 2 and 50 characters")
    @Column(name = "lastname", nullable = false)
    private String lastname;

    @Size(max=500, message ="Bio cannpt be longer than 500 characters")
    private String bio;

    @Min(value =0, message = "YearsPetting must be greater than or equal to 0")
    // @Column(nullable = false)
    private Integer YearsPetting;

    
    private Date DateOfBirth;

    private String userProfilePicture;

    @Pattern(regexp = "Male|Female|Other", message = "Sex must be Male, Female, or Other")
    // @Column(nullable = false)
    private String sex;

    @Column(columnDefinition = "VARCHAR DEFAULT 'user' " , nullable = false) 
    @Pattern(regexp = "ADMIN|USER", message = "Role must be admin or user")
    private String role;

    @Size(max=100, message ="Address cannot be longer than 100 characters")
    private String address;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<PetCard> petCards;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Notifications>  notifications;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @com.fasterxml.jackson.annotation.JsonManagedReference
    private List<Rating> ratings;
    

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (role == null || role.isEmpty()) {
            role = "USER";  // ensure it's uppercase and default
        }
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));
    }
    
    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
    public String getProfileImageUrl() {
        return this.userProfilePicture;
    }

}
