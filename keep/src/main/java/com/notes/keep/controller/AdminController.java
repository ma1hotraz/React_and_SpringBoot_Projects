package com.notes.keep.controller;

import com.notes.keep.dto.UserDTO;
import com.notes.keep.service.AdminServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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

    @GetMapping("/find/name/{name}")
    public ResponseEntity<?> findUserByName(@PathVariable String name) {
        UserDTO userDTO = adminServices.findUserByName(name);
        if (userDTO == null) {
            return ResponseEntity.noContent().build();
        }
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
            List<UserDTO> userDTO = adminServices.userListByDate(timestamp);
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