package com.myallpet.myallpet.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class LoginRequestDTO {

    @NotBlank(message = "Email is required")
    private String username;
    @NotBlank(message = "Password is required")
    private String password;
    public Object getUsername() {
        return username;
    }
}
