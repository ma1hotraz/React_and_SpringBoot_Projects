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

import java.util.List;

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
        userRepository.save(user);
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setName(user.getFirstName() + " " + user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setImage(null);
        return userDTO;
    }

    @Override
    public User findByUserId(Integer userId) {
        User user = userRepository.findById(userId).get();
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
        User newUser = userRepository.save(userOld);
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(newUser.getUserId());
        userDTO.setEmail(newUser.getEmail());
        userDTO.setName(newUser.getFirstName() + " " + newUser.getLastName());
        byte[] download = null;
        download = ImageUtils.decompressImage(newUser.getImage());
        userDTO.setImage(download);
        return userDTO;
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
