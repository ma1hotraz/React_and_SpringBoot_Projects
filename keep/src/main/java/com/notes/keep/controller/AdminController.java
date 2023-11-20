package com.notes.keep.controller;

import com.notes.keep.dto.AdminDTO;
import com.notes.keep.dto.UserDTO;
import com.notes.keep.dto.UserDTODate;
import com.notes.keep.model.AuthRequest;
import com.notes.keep.repository.AdminRepository;
import com.notes.keep.service.impl.AdminServiceImpl;
import com.notes.keep.utils.Loggers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminServiceImpl adminServiceImpl;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        if (!adminRepository.findByEmail(authRequest.getEmail()).isPresent()) {
            Loggers.warn("EMAIL/USER NOT EXIST");
            return ResponseEntity.status(409).header("msg", "EMAIL/USER NOT EXIST").build();
        }
        AdminDTO adminDTO = null;
//        try {
//        Authentication authenticationRequest =
//                UsernamePasswordAuthenticationToken.unauthenticated(authRequest.getEmail(), authRequest.getPassword());
//
//        System.out.println(authenticationRequest);
//
//        Authentication authenticationResponse =
//                this.authenticationManager.authenticate(authenticationRequest);
//        System.out.println(authenticationResponse);


        adminDTO = adminServiceImpl.login(authRequest);
        Loggers.info("ADMIN WITH EMAIL " + authRequest.getEmail() + " LOGGED IN");

//        } catch (Exception e) {
//            return ResponseEntity.status(401).header("msg", "INVALID HHHH EMAIL OR PASSWORD").build();
//        }
        return ResponseEntity.ok(adminDTO);
    }


    @GetMapping("/getAllUser")
    public ResponseEntity<?> getAllUsers() {
        List<UserDTODate> userDTO = adminServiceImpl.userList();
        if (userDTO.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        Loggers.info("ALL USERS LIST REQUESTED BY ADMIN");
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/getAllNumber")
    public ResponseEntity<?> getAllNumber() {
        List<UserDTODate> userDTO = adminServiceImpl.userList();
        if (userDTO.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        Loggers.info("ALL USERS NUMBER REQUESTED BY ADMIN");
        return ResponseEntity.ok(userDTO.size());
    }

    @GetMapping("/getDBSize")
    public ResponseEntity<?> getDBSize() {
        Double size = adminServiceImpl.sizeOfDB();
        Loggers.info("DB SIZE REQUESTED BY ADMIN");
        return ResponseEntity.ok(size);
    }

    @GetMapping("/find/email/{email}")
    public ResponseEntity<?> findUserByEmail(@PathVariable String email) {
        UserDTO userDTO = adminServiceImpl.findUserByEmail(email);
        if (userDTO == null) {
            return ResponseEntity.noContent().build();
        }
        Loggers.info("USER WITH EMAIL " + email + " REQUESTED BY ADMIN");
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/find/name/{name}")
    public ResponseEntity<?> findUserByName(@PathVariable String name) {
        UserDTO userDTO = adminServiceImpl.findUserByName(name);
        if (userDTO == null) {
            return ResponseEntity.noContent().build();
        }
        Loggers.info("USER WITH NAME " + name + " REQUESTED BY ADMIN");
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/find/date/{date}")
    public ResponseEntity<?> findUsersByDate(@PathVariable String date) {
        try {
            long timestamp;
            try {
                timestamp = Long.parseLong(date);

            } catch (NumberFormatException ex) {

                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date parsedDate = dateFormat.parse(date);
                timestamp = parsedDate.getTime();
            }
            Loggers.info("USERS WITH DATE " + date + " REQUESTED BY ADMIN");
            List<UserDTO> userDTO = adminServiceImpl.userListByDate(timestamp);
            if (userDTO.isEmpty()) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.ok(userDTO);
            }
        } catch (ParseException e) {
            return ResponseEntity.badRequest().body("Invalid date parameter. Please provide a valid timestamp or date (yyyy-MM-dd).");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error.");
        }
    }


}