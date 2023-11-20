package com.notes.keep.config;


import com.notes.keep.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class AdminDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println(adminRepository.findByEmail(email).get());
        if (!adminRepository.findByEmail(email).isPresent()) {
            return null;
        }
        return adminRepository.findByEmail(email).get();
    }
}
