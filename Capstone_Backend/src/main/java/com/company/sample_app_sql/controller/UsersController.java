package com.company.sample_app_sql.controller;

import com.company.sample_app_sql.entity.Users;
import com.company.sample_app_sql.service.UsersService;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
public class UsersController {

    private final UsersService usersService;

    @GetMapping("/users/all")
    public ResponseEntity<List<Users>> fetchAllUsers() {
        List<Users> users = usersService.fetchAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<Users> fetchUserById(@PathVariable Integer userId) {
        Users user = usersService.fetchUserById(userId);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/users/delete/{userId}")
    public ResponseEntity<Map<String, String>> deleteUserById(@PathVariable Integer userId) {
        Users user = usersService.fetchUserById(userId);
        Map<String, String> response = new HashMap<>();

        if (user != null) {
            usersService.deleteUserById(userId);
            response.put("message", "User deleted successfully");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
    @PutMapping("/users/update/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable Integer userId, @RequestBody Users updatedUser) {
        Users existingUser = usersService.fetchUserById(userId);
        if (existingUser != null) {
            usersService.updateUser(userId, updatedUser);
            return ResponseEntity.ok("User updated successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    @PostMapping("/users/create")
    public ResponseEntity<String> createUser(@RequestBody Users newUser) {
        if (usersService.existsByUsername(newUser.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Username is already taken. Please choose a different one.");
        }
        Users createdUser = usersService.createUser(newUser);
        return createdUser != null ? ResponseEntity.status(HttpStatus.CREATED).body("User created successfully")
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User creation failed");
    }



    @PostMapping("/users/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        Users user = usersService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());

        if (user != null) {
            Map<String, String> response = new HashMap<>();
            response.put("username", user.getUsername());
            response.put("role", user.getRole());

            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("message", "Invalid username or password"));
    }

    @Getter
    @Setter
    public static class LoginRequest {
        private String username;
        private String password;

        public LoginRequest(String username, String password) {
            this.username = username;
            this.password = password;
        }
    }
}
