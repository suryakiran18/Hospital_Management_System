package com.company.sample_app_sql.service;

import com.company.sample_app_sql.entity.Users;
import com.company.sample_app_sql.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UsersService {
@Autowired
    private final UsersRepository usersRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();  // Instantiate here

    public List<Users> fetchAllUsers() {
        return usersRepository.findAll();
    }

    public Users fetchUserById(Integer userId) {
        return usersRepository.findById(userId).orElse(null);
    }

    public void deleteUserById(Integer userId) {
        usersRepository.deleteById(userId);
    }

    public Users createUser(Users newUser) {
        // Hash the password before saving
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(newUser.getPassword());
        newUser.setPassword(hashedPassword);  // Set the hashed password

        // Save the new user
        return usersRepository.save(newUser);
    }

    public boolean existsByUsername(String username) {
        return usersRepository.existsByUsername(username);
    }


    public void updateUser(Integer userId, Users updatedUser) {
        Users existingUser = fetchUserById(userId);
        if (existingUser != null) {
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setRole(updatedUser.getRole());
            existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
            existingUser.setIsActive(updatedUser.getIsActive());
            // Hash the password before updating
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }
            usersRepository.save(existingUser);
        }
    }

    public Users authenticateUser(String username, String password) {
        // Fetch the user by username
        Users user = usersRepository.findByUsername(username);

        // Check if the user exists and the password matches
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user; // Return the user if the credentials match
        } else {
            return null; // Return null if the credentials do not match
        }
    }
}
