package com.notes.keep.service.impl;

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
import com.notes.keep.service.AdminDetailsService;
import com.notes.keep.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.sql.Date;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminDetailsService {
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager manager;
    @Autowired
    private JwtService jwtService;

    public AdminServiceImpl() {
    }

    public AdminDTO login(AuthRequest request) {
        Optional<Admin> temp = adminRepository.findByEmail(request.getEmail());
        System.out.println(temp.get());
        Admin admin = null;
        AuthResponse token = null;
        try {
            System.out.println("ISSUE");
            manager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            System.out.println("ISSUE GHASHDIAISDHIASD");
            admin = temp.get();
            System.out.println("ADMIN DATA " + admin);
            var jwtToken = jwtService.generateToken(admin);
            token = AuthResponse.builder().token(jwtToken).build();
        } catch (Exception e) {
            e.printStackTrace();
            return AdminDTO.builder().build();
        }
        return AdminDTO.builder().email(admin.getEmail()).name(admin.getFirstName() + " " + admin.getLastName()).role(admin.getRoles()).response(token).build();
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

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        if (!adminRepository.existsByEmail(email)) {
            return null;
        }
        return userRepository.findByEmail(email).get();
    }

}
