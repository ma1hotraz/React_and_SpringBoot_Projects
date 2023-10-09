package com.notes.keep.controller;

import com.notes.keep.dto.UserDTO;
import com.notes.keep.model.AuthRequest;
import com.notes.keep.model.User;
import com.notes.keep.service.UserServiceImpl;
import com.notes.keep.utils.ImageUtils;
import com.notes.keep.utils.Loggers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;

@RestController
@RequestMapping("/user")
public class UserController {

    @Value("${project.image}")
    public String path;
    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/add")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        if (userService.checkEmail(user.getEmail())) {
            Loggers.warn("EMAIL ALREADY EXIST");
            return ResponseEntity.status(409).build();
        }
        Loggers.info("USER CREATED WITH EMAIL : " + user.getEmail());
        UserDTO userDTO = userService.createUser(user);
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequest user) throws InterruptedException {
        if (!userService.checkEmail(user.getEmail())) {
            Loggers.warn("EMAIL/USER NOT EXIST");
            return ResponseEntity.status(409).header("msg", "EMAIL/USER NOT EXIST").build();
        }
        Loggers.info("USER WITH EMAIL " + user.getEmail() + " LOGGED IN");
        User user1 = userService.loginUser(user);
        if (user1 == null) {
            return null;
        }
        //TODO Will use model_mapping later User -> UserDTO
        return ResponseEntity.ok(user1);
    }

    @GetMapping("/userId/{id}")
    public ResponseEntity<?> findByUserId(@PathVariable Integer id) {
        Loggers.info("USER WITH" + id + " CALLED");
        return ResponseEntity.ok(userService.findByUserId(id));
    }

//    @PutMapping("/updateUser/")
//    public ResponseEntity<?> updateUser(@ModelAttribute User user) throws IOException {
//        Loggers.info("UPDATED USER CALLED");
//        System.out.println("newUser " + user);
//        if (!Objects.equals(user.getFile().getContentType(), "image/png")) {
//            Loggers.error("INVALID IMAGE TYPE");
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
//        }
//        byte[] arr = ImageUtils.convertMultipartFileToByteArray(user.getFile());
//        user.setImage(arr);
//        UserDTO userDTO = userService.updateUser(user);
//        return ResponseEntity.ok(userDTO);
//    }
@PutMapping("/updateUser/")
public ResponseEntity<?> updateUser(@ModelAttribute User user) throws IOException {
    Loggers.info("UPDATED USER CALLED");
    System.out.println("newUser " + user);

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
