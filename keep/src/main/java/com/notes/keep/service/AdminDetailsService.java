package com.notes.keep.service;

import com.notes.keep.dto.AdminDTO;
import com.notes.keep.dto.UserDTO;
import com.notes.keep.model.AuthRequest;
import com.notes.keep.dto.UserDTODate;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;


public interface AdminDetailsService extends UserDetailsService {

    AdminDTO login(AuthRequest request);
    List<UserDTODate> userList();
    public UserDTO findUserByEmail(String email);
    public UserDTO findUserByName(String name);
    public List<UserDTO> userListByDate(long date);
    public Double sizeOfDB();
}
