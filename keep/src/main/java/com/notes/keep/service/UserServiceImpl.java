package com.notes.keep.service;

import com.notes.keep.dto.UserDTO;
import com.notes.keep.model.AuthRequest;
import com.notes.keep.model.User;
import com.notes.keep.repository.UserRepository;
import com.notes.keep.utils.EncryptionUtil;
import com.notes.keep.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private BCryptPasswordEncoder encoder;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EncryptionUtil encryptionUtil;


    @Override
    public UserDTO createUser(User user) {
        user.setRole("USER");
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
        return UserDTO.builder().userId(user.getUserId()).email(user.getEmail()).name(user.getFirstName() + " " + user.getLastName()).image(user.getImage()).build();
    }

    @Override
    public User findByUserId(UUID userId) {
        Optional<User> user = Optional.of(userRepository.findById(userId).get());
        return userRepository.findById(userId).get();
    }


    @Override
    public User loginUser(AuthRequest user) {
        System.out.println(user.getEmail() + " " + user.getPassword());
        User user1 = userRepository.findByEmail(user.getEmail());
        String password = encryptionUtil.encrypt(user1.getPassword());
        if (password.equals(user.getPassword())) {
            return null;
        }
        return user1;
    }

    public UserDTO updateUser(User user) {
        User userOld = userRepository.findByEmail(user.getEmail());
        System.out.println("oldUser" + userOld);
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

    //METHODS NEEDS TO IMPLEMENT

    @Override
    public void updateResetPasswordToken(String token, String email) {

    }

//    @Override
//    public UserDetails getResetPasswordToken(String token) {
//        return null;
//    }
//
//    @Override
//    public void updatePassword(UserDetails user, String newPassword) {
//
//    }

}
