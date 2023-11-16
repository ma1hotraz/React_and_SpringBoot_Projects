package com.notes.keep.service.impl;

import com.notes.keep.config.jwt.JwtService;
import com.notes.keep.dto.UserDTO;
import com.notes.keep.model.AuthRequest;
import com.notes.keep.model.AuthResponse;
import com.notes.keep.model.User;
import com.notes.keep.repository.UserRepository;
import com.notes.keep.service.CustomUserService;
import com.notes.keep.utils.EncryptionUtil;
import com.notes.keep.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class CustomUserServiceImpl implements CustomUserService {

    @Autowired
    private BCryptPasswordEncoder encoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EncryptionUtil encryptionUtil;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager manager;


    @Override
    public UserDTO createUser(User user) {
        user.setRoles("USER");
        user.setPassword(encoder.encode(user.getPassword()));
        Date utilDate = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        String formattedDate = dateFormat.format(utilDate);
        try {
            Date date = dateFormat.parse(formattedDate);
            java.sql.Date sqlDate = new java.sql.Date(date.getTime());
            user.setDate(sqlDate);
            userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
        var jwtToken = jwtService.generateToken(user);
        AuthResponse token = AuthResponse.builder().token(jwtToken).build();
        return UserDTO.builder().userId(user.getUserId()).name(user.getFirstName() + " " + user.getLastName()).email(user.getEmail()).image(user.getImage()).response(token).build();
    }

    @Override
    public User findByUserId(UUID userId) {
        return userRepository.findById(userId).get();
    }


    @Override
    public UserDTO loginUser(AuthRequest user) {
        Optional<User> user1 = userRepository.findByEmail(user.getEmail());
        manager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        user.getPassword()
                )
        );
        var userTemp = user1.get();
        var jwtToken = jwtService.generateToken(userTemp);
        AuthResponse token = AuthResponse.builder().token(jwtToken).build();
        return UserDTO.builder().userId(userTemp.getUserId()).name(userTemp.getFirstName() + " " + userTemp.getLastName()).email(userTemp.getEmail()).image(userTemp.getImage()).response(token).build();
    }

    public UserDTO updateUser(User user) {
        Optional<User> temp = userRepository.findByEmail(user.getEmail());
        User userOld = temp.get();
        byte[] upload = null;
        upload = ImageUtils.compressImage(user.getImage());
        userOld.setImage(upload);
        userOld.setFileSize(user.getFile().getSize() / 1024);
        User newUser = userRepository.save(userOld);
        byte[] download = null;
        download = ImageUtils.decompressImage(newUser.getImage());
        return UserDTO.builder().userId(newUser.getUserId()).email(newUser.getEmail()).name(newUser.getFirstName() + " " + newUser.getLastName()).image(download).build();
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        if(!checkEmail(email)){
            return null;
        }
        return userRepository.findByEmail(email).get();
    }

    //METHODS NEEDS TO IMPLEMENT

}
