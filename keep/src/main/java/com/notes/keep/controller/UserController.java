package com.notes.keep.controller;

import com.notes.keep.model.User;
import com.notes.keep.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public User addUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping("/getAll/{id}")
    public ResponseEntity<?> getAllNotes(@PathVariable Integer id) {
        System.out.println("Hello "+ id);
        return ResponseEntity.ok(userService.getByUserId(id));
    }


}
