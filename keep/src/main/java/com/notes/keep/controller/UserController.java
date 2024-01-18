package com.notes.keep.controller;

import com.notes.keep.dto.LoginInfoDTO;
import com.notes.keep.dto.PasswordRequestDTO;
import com.notes.keep.dto.UserDTO;
import com.notes.keep.enums.Provider;
import com.notes.keep.model.AuthRequest;
import com.notes.keep.model.User;
import com.notes.keep.service.impl.CustomUserServiceImpl;
import com.notes.keep.utils.ImageUtils;
import com.notes.keep.utils.Loggers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
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
        user.setAuthProvider("LOCAL");
        UserDTO userDTO = userService.createUser(user);
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequest user) throws InterruptedException {
        if (!userService.checkEmail(user.getEmail())) {
            Loggers.warn("EMAIL/USER NOT EXIST");
            return ResponseEntity.status(409).header("msg", "EMAIL/USER NOT EXIST").build();
        }
        UserDTO userDTO = null;
        try {
            userDTO = userService.loginUser(user);
            Loggers.info("USER WITH EMAIL " + user.getEmail() + " LOGGED IN");
        } catch (Exception e) {
            return ResponseEntity.status(401).header("msg", "INVALID EMAIL OR PASSWORD").build();
        }
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/userId/{id}")
    public ResponseEntity<?> findByUserId(@PathVariable UUID id) {
        System.out.println("here is the control " + id);
        Loggers.info("USER WITH" + id + " CALLED");
        return ResponseEntity.ok(userService.findByUserId(id));
    }


    @PutMapping("/updateUser/")
    public ResponseEntity<?> updateUser(@ModelAttribute User user) throws IOException {
        System.out.println(user);
        if (!isValidImage(user.getFile())) {
            Loggers.error("INVALID IMAGE TYPE");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid image type.");
        }
        byte[] arr = ImageUtils.convertMultipartFileToByteArray(user.getFile());
        user.setImage(arr);
        UserDTO userDTO = userService.updateUser(user);
        Loggers.info("USER UPDATED WITH EMAIL " + user.getEmail());
        return ResponseEntity.ok(userDTO);
    }

    private boolean isValidImage(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image/");
    }

    @PostMapping("/auth/forget")
    public ResponseEntity<?> forgetPassword(@RequestBody AuthRequest request) {
        Loggers.info("Password Reset Requested By " + request.getEmail());
        if (!userService.checkEmail(request.getEmail())) {
            return ResponseEntity.status(409).build();
        }
        userService.resetPassword(request.getEmail());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/auth/reset")
    public ResponseEntity<?> updatePassword(@RequestBody PasswordRequestDTO request) {
        System.out.println(request);
        if (!userService.checkEmail(request.getEmail())) {
            return ResponseEntity.status(409).build();
        }
        try {
            userService.updatePassword(request.getEmail(), request.getPassword(), request.getToken());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            switch (e.getMessage()) {
                case "Token Expired, Request new Token":
                    return ResponseEntity.status(401).body(e.getMessage());
                case "Cannot Use Old Password":
                    return ResponseEntity.status(422).body(e.getMessage());
                case "Email not found":
                    return ResponseEntity.status(404).body(e.getMessage());
            }
        }
        Loggers.info("Password Reset Successfully");
        return ResponseEntity.ok().build();
    }

    @PostMapping("/logInfo")
    public ResponseEntity<?> getUserLogs(@RequestHeader String email,@RequestBody LoginInfoDTO infoDTO){
        try{
            userService.sendLoginInfo(email, infoDTO);
        }catch (Exception e){
            return ResponseEntity.status(500).body("UNABLE TO SEND LOGIN INFO");
        }
        return ResponseEntity.ok().body("LOGIN INFO SEND");
    }
}
