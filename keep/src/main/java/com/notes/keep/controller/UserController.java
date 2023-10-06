package com.notes.keep.controller;

import com.notes.keep.dto.UserDTO;
import com.notes.keep.model.AuthRequest;
import com.notes.keep.model.User;
import com.notes.keep.service.UserServiceImpl;
import com.notes.keep.utils.Loggers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/add")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        if (userService.checkEmail(user.getEmail())) {
            Loggers.warn("EMAIL ALREADY EXIST");
            return ResponseEntity.status(409).build();
        }
        Loggers.info("USER CREATED WITH EMAIL : " + user.getEmail());
        User user1 = userService.createUser(user);
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user1.getUserId());
        userDTO.setName(user1.getFirstName() + user.getLastName());
        userDTO.setEmail(user.getEmail());
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
        if(user1 == null){
            return null;
        }
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user1.getUserId());
        userDTO.setName(user1.getFirstName() + user1.getLastName());
        userDTO.setEmail(user.getEmail());
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/userId/{id}")
    public ResponseEntity<?> findByUserId(@PathVariable Integer id) {
        Loggers.info("USER WITH" + id + " CALLED");
        return ResponseEntity.ok(userService.findByUserId(id));
    }


}
