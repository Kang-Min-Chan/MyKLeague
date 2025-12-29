package com.mykleague.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    private Long user_id;

    private String email;
    private String password;
    private String nickname;
    private String username;

    private LocalDateTime created_at;

    @PrePersist
    public void onCreate() {
        this.created_at = LocalDateTime.now();
    }

    public Long getUser_id() { return user_id; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getNickname() { return nickname; }
    public String getUsername() { return username; }
    public LocalDateTime getCreated_at() { return created_at; }

    public void setUser_id(Long user_id) { this.user_id = user_id; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setNickname(String nickname) { this.nickname = nickname; }
    public void setUsername(String username) { this.username = username; }
}
