package com.myallpet.myallpet.Repository;

import com.myallpet.myallpet.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
