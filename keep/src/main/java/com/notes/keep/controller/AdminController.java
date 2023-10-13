package com.notes.keep.controller;

import com.notes.keep.dto.UserDTO;
import com.notes.keep.model.User;
import com.notes.keep.service.AdminServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminServices adminServices;

    @GetMapping("/getAllUser")
    public ResponseEntity<?> getAllUsers() {
        List<UserDTO> userDTO = adminServices.userList();
        if (userDTO == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/find/email/{email}")
    public ResponseEntity<?> findUserByEmail(@PathVariable String email) {
        UserDTO userDTO = adminServices.findUserByEmail(email);
        if (userDTO == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(userDTO);
    }
}
