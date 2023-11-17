package com.notes.keep.utils;

import com.notes.keep.model.Admin;
import com.notes.keep.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminDataLoader implements CommandLineRunner {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (!adminRepository.existsByEmail("sushantraj215@gmail.com")) {

            Admin user = Admin.builder()
                    .firstName("Sushant")
                    .lastName("Raj")
                    .email("sushantraj215@gmail.com")
                    .password(passwordEncoder.encode("gtadj9bg@_!"))
                    .roles("ADMIN").build();
            adminRepository.save(user);

            System.out.println("Default user has been inserted into the database.");
        }
        else{
            System.out.println("Default user exist in the database.");
        }
    }
}
