package com.myallpet.myallpet.Repository;

import com.myallpet.myallpet.Models.User;

import java.util.Optional;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  boolean existsByEmail(String email);
  Optional<User> findByEmail(String email);
  boolean existsByUsername(String username);
  Optional<User> findByUsername(String username);


} 
