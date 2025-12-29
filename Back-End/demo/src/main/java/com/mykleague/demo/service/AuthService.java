package com.mykleague.demo.service;

import com.mykleague.demo.entity.User;
import com.mykleague.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean register(Long userId, String email, String password, String nickname, String username) {

        if (userRepository.existsById(userId)) return false;

        User user = new User();
        user.setUser_id(userId);
        user.setEmail(email);
        user.setPassword(password);
        user.setNickname(nickname);
        user.setUsername(username);

        userRepository.save(user);
        return true;
    }

    public boolean login(Long userId, String password) {
        return userRepository.findById(userId)
                .map(u -> u.getPassword().equals(password))
                .orElse(false);
    }
}
