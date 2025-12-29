package com.mykleague.demo.controller;

import com.mykleague.demo.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@RequestParam Long user_id,
                           @RequestParam String email,
                           @RequestParam String password,
                           @RequestParam String nickname,
                           @RequestParam String username) {

        return authService.register(user_id, email, password, nickname, username)
                ? "REGISTER SUCCESS"
                : "USER ALREADY EXISTS";
    }

    @PostMapping("/login")
    public String login(@RequestParam Long user_id,
                        @RequestParam String password) {

        return authService.login(user_id, password)
                ? "LOGIN SUCCESS"
                : "LOGIN FAIL";
    }
}
