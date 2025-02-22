package com.myallpet.myallpet.Service;

import com.myallpet.myallpet.Models.User;
import com.myallpet.myallpet.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    

    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
