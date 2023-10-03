package com.notes.keep.service;

import com.notes.keep.model.AuthRequest;
import com.notes.keep.model.User;


import java.util.List;

public interface UserService {
    public User createUser(User user);

    public User findByUserId(Integer userId);

    public User loginUser(AuthRequest user);

    public List<User> getAllUser();

    public boolean checkEmail(String email);

    public void updateResetPasswordToken(String token, String email);
//
//    public UserDetails getResetPasswordToken(String token);
//
//    public void updatePassword(UserDetails user, String newPassword);

}
