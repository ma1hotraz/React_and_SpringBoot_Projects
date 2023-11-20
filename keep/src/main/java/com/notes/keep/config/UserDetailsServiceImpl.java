package com.notes.keep.config;

import com.notes.keep.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.notes.keep.repository.UserRepository;

import java.util.Optional;

@Service

public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository repository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> temp = repository.findByEmail(email);
        User user = temp.get();
        if (user != null) {
            return new CustomUserDetails(user);
        }
        throw new UsernameNotFoundException("User Not Found");
    }

}