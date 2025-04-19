package com.myallpet.myallpet.DTO;

import com.fasterxml.jackson.annotation.JsonAlias;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class SignUpRequestDTO {


    @NotBlank(message = "Email is required")
    private String email;
    @NotBlank(message = "Username is required")
    private String username;
    @NotBlank(message = "Password is required")
    private String password;
    
    @JsonAlias({"firstName", "firstname"})
    @NotBlank(message = "First Name is required")
    private String firstname;

    @JsonAlias({"lastName", "lastname"})
    @NotBlank(message = "Last Name is required")
    private String lastname;

    public String getFirstName() {  // ✅ Ensure getter exists
        return firstname;
    }

    public String getLastName() {  // ✅ Ensure getter exists
        return lastname;
    }
}


