package com.notes.keep.service;

import com.notes.keep.dto.UserDTO;
import com.notes.keep.model.AuthRequest;
import com.notes.keep.model.AuthResponse;
import com.notes.keep.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;


import java.util.List;
import java.util.UUID;

public interface CustomUserService extends UserDetailsService{

    public UserDTO createUser(User user);

    public User findByUserId(UUID userId);

    public UserDTO loginUser(AuthRequest user);

    public List<User> getAllUser();

    public boolean checkEmail(String email);

}
