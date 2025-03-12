package com.myallpet.myallpet.DTO;

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
    @NotBlank(message = "FirstName is required")
    private String firstname;
    @NotBlank(message = "LastName is required")
    private String lastname;

    public String getFirstName() {  // ✅ Ensure getter exists
        return firstname;
    }

    public String getLastName() {  // ✅ Ensure getter exists
        return lastname;
    }
}


