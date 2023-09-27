package com.notes.keep.controller;

import com.notes.keep.model.User;
import com.notes.keep.service.UserService;
import com.notes.keep.utils.Loggers;
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

    @GetMapping("/userId/{id}")
    public ResponseEntity<?> findByUserId(@PathVariable Integer id) {
        Loggers.info("USER WITH" + id + " CALLED");
        return ResponseEntity.ok(userService.findByUserId(id));
    }


}
