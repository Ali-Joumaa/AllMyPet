package com.myallpet.myallpet.utils;

public class JwtResponse {
  private String token;
  private String type = "Bearer";  // This is often used to indicate the type of the token.
  private String username;         // Optional: Include username or other user details as needed.
  private String role;

  // Constructor to initialize the JWT response.
  public JwtResponse(String token, String username, String role) {
      this.token = token;
      this.username = username;
      this.role = role;
  }

  // Getters and setters
  public String getToken() {
      return token;
  }

  public void setToken(String token) {
      this.token = token;
  }

  public String getType() {
      return type;
  }

  public void setType(String type) {
      this.type = type;
  }

  public String getUsername() {
      return username;
  }

  public void setUsername(String username) {
      this.username = username;
  }

  public String getRole() {
      return role;
  }

  public void setRole(String role) {
      this.role = role;
  }
}

