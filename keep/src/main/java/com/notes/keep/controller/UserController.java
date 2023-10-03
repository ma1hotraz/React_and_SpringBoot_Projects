package com.notes.keep.controller;

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
        System.out.println(user);
        if (userService.checkEmail(user.getEmail())) {
            Loggers.warn("EMAIL ALREADY EXIST");
            return ResponseEntity.status(409).build();
        }
        return ResponseEntity.ok(userService.createUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequest user) {
        System.out.println("THSI IS " + user);
        if (!userService.checkEmail(user.getEmail())) {
            Loggers.warn("EMAIL/USER NOT EXIST");
            return ResponseEntity.status(409).build();
        } else {
            Loggers.info("USER WITH EMAIL " + user.getEmail() + " LOGGED IN");
            return ResponseEntity.ok(userService.loginUser(user));
        }
    }

    @GetMapping("/userId/{id}")
    public ResponseEntity<?> findByUserId(@PathVariable Integer id) {
        Loggers.info("USER WITH" + id + " CALLED");
        return ResponseEntity.ok(userService.findByUserId(id));
    }


}
