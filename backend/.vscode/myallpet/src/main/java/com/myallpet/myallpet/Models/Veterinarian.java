package com.myallpet.myallpet.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "veterinarians")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Veterinarian {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vetId;

    @NotBlank(message = "First Name is required")
    @Size(min = 2, max = 30, message = "First Name must be between 2 and 50 characters")
    @Column(nullable = false)
    private String FirstName;

    @NotBlank(message = "Last Name is required")
    @Size(min = 2, max = 30, message = "Last Name must be between 2 and 50 characters")
    @Column(nullable = false)
    private String LastName;

    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @Min(value=0)
    @Column(nullable = false)
    private Integer exp_years;

    @Pattern(regexp = "Male|Female|Other", message = "Sex must be Male, Female, or Other")
    @Column(nullable = false)
    private String sex;

    @Size(max=100, message ="Address cannot be longer than 100 characters")
    private String location;

    private String profilePicture;


    // @Pattern(regexp = "\\d{10}", message = "Phone number must be a 10-digit number")
    @Column(nullable = false)
    private String PhoneNumber;
}
