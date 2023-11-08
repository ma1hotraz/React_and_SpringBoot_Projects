package com.notes.keep.service;

import com.notes.keep.dto.UserDTO;
import com.notes.keep.dto.UserDTODate;
import com.notes.keep.model.User;
import com.notes.keep.repository.AdminRepository;
import com.notes.keep.repository.UserRepository;
import com.notes.keep.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.sql.Date;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServices {
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    public AdminServices() {
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
        User user = userRepository.findByEmail(email);
        UserDTO userDTO = null;
        if (user == null) {
            return userDTO;
        }
        userDTO = UserDTO.builder().userId(user.getUserId()).name(user.getFirstName() + " " + user.getLastName()).email(user.getEmail()).image(user.getImage()).build();
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

    public String sendLogs(){
        return null;
    }


}
