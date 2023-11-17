package com.notes.keep.controller;

import com.notes.keep.dto.UserDTO;
import com.notes.keep.model.AuthRequest;
import com.notes.keep.model.AuthResponse;
import com.notes.keep.model.User;
import com.notes.keep.service.impl.CustomUserServiceImpl;
import com.notes.keep.utils.ImageUtils;
import com.notes.keep.utils.Loggers;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController {

    @Value("${project.image}")
    public String path;
    @Autowired
    private CustomUserServiceImpl userService;
    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/auth/add")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        if (user.getEmail().isEmpty() || user.getEmail().isBlank() && user.getFirstName().isBlank() || user.getFirstName().isEmpty() && user.getPassword().isEmpty() || user.getPassword().isBlank() && user.getLastName().isBlank() || user.getLastName().isEmpty()) {
            return ResponseEntity.status(422).header("msg", "ANY OF THE VALUE IS EMPTY").build();
        }
        if (userService.checkEmail(user.getEmail())) {
            Loggers.warn("EMAIL ALREADY EXIST");
            return ResponseEntity.status(409).build();
        }
        Loggers.info("USER CREATED WITH EMAIL : " + user.getEmail());
        UserDTO userDTO = userService.createUser(user);
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequest user) throws InterruptedException {
        if (!userService.checkEmail(user.getEmail())) {
            Loggers.warn("EMAIL/USER NOT EXIST");
            return ResponseEntity.status(409).header("msg", "EMAIL/USER NOT EXIST").build();
        }
        try {
            Authentication authenticationRequest =
                    UsernamePasswordAuthenticationToken.unauthenticated(user.getEmail(), user.getPassword());
            Authentication authenticationResponse =
                    this.authenticationManager.authenticate(authenticationRequest);
            Loggers.info("USER WITH EMAIL " + user.getEmail() + " LOGGED IN");

        } catch (Exception e) {
            return ResponseEntity.status(401).header("msg", "INVALID EMAIL OR PASSWORD").build();
        }
        UserDTO userDTO = userService.loginUser(user);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/userId/{id}")
    public ResponseEntity<?> findByUserId(@PathVariable UUID id) {
        System.out.println("here is the control "+id);
        Loggers.info("USER WITH" + id + " CALLED");
        return ResponseEntity.ok(userService.findByUserId(id));
    }


    @PutMapping("/updateUser/")
    public ResponseEntity<?> updateUser(@ModelAttribute User user) throws IOException {
        Loggers.info("UPDATE USER CALLED");

        if (!isValidImage(user.getFile())) {
            Loggers.error("INVALID IMAGE TYPE");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid image type.");
        }

        byte[] arr = ImageUtils.convertMultipartFileToByteArray(user.getFile());
        user.setImage(arr);

        UserDTO userDTO = userService.updateUser(user);

        return ResponseEntity.ok(userDTO);
    }

    private boolean isValidImage(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image/");
    }


}
