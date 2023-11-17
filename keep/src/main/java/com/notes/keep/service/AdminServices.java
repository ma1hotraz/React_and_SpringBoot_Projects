package com.notes.keep.service;

import com.notes.keep.config.SecurityConfig;
import com.notes.keep.config.jwt.JwtService;
import com.notes.keep.dto.AdminDTO;
import com.notes.keep.dto.UserDTO;
import com.notes.keep.dto.UserDTODate;
import com.notes.keep.model.Admin;
import com.notes.keep.model.AuthRequest;
import com.notes.keep.model.AuthResponse;
import com.notes.keep.model.User;
import com.notes.keep.repository.AdminRepository;
import com.notes.keep.repository.UserRepository;
import com.notes.keep.utils.ImageUtils;
import com.notes.keep.utils.Loggers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;

import java.util.*;
import java.sql.Date;
import java.util.stream.Collectors;

@Service
public class AdminServices {
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager manager;
    @Autowired
    private JwtService jwtService;

    public AdminServices() {
    }

    public AdminDTO login(AuthRequest request) {
        Optional<Admin> temp = adminRepository.findById(request.getEmail());
        manager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        Admin admin = temp.get();
        var jwtToken = jwtService.generateToken(admin);
        AuthResponse token = AuthResponse.builder().token(jwtToken).build();
        return AdminDTO.builder().email(admin.getEmail()).name(admin.getFirstName() + " " + admin.getLastName()).response(token).build();
    }

    public List<UserDTODate> userList() {
        List<User> users = userRepository.findAll();

        if (users.isEmpty()) {
            return Collections.emptyList();
        }

        return users.stream()
                .map(user -> UserDTODate.builder()
                        .userId(user.getUserId())
                        .email(user.getEmail())
                        .name(user.getFirstName() + " " + user.getLastName())
                        .image(user.getImage() != null ? ImageUtils.decompressImage(user.getImage()) : user.getImage()).date(user.getDate())
                        .build())
                .collect(Collectors.toList());
    }


    public UserDTO findUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        UserDTO userDTO = null;
        if (!user.isPresent()) {
            return userDTO;
        }
        User user1 = user.get();
        userDTO = UserDTO.builder().userId(user1.getUserId()).name(user1.getFirstName() + " " + user1.getLastName()).email(user1.getEmail()).image(user1.getImage()).build();
        return userDTO;
    }

    public UserDTO findUserByName(String name) {
        User user = userRepository.findByFirstName(name);
        UserDTO userDTO = null;
        if (user == null) {
            return userDTO;
        }
        userDTO = UserDTO.builder().userId(user.getUserId()).name(user.getFirstName() + " " + user.getLastName()).email(user.getEmail()).image(user.getImage()).build();
        return userDTO;
    }

    public List<UserDTO> userListByDate(long date) {

        Date sqlDate = new Date(date);
        List<User> users = userRepository.findUserByDate(date);
        if (users.isEmpty()) {
            return Collections.emptyList();
        }

        return users.stream()
                .map(user -> UserDTO.builder()
                        .userId(user.getUserId())
                        .email(user.getEmail())
                        .name(user.getFirstName() + " " + user.getLastName())
                        .image(user.getImage())
                        .build())
                .collect(Collectors.toList());
    }

    public Double sizeOfDB() {
        return adminRepository.sizeOfDB();
    }

    public String sendLogs() {
        return null;
    }


}
