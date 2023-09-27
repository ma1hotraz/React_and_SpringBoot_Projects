package com.notes.keep.service;

import com.notes.keep.dto.UserDTO;
import com.notes.keep.model.Notes;
import com.notes.keep.model.User;
import com.notes.keep.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MatchingStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private ModelMapper modelMapper;

    public User createUser(User user){
        return userRepository.save(user);
    }

    public User getByUserId(Integer userId){
        User user = userRepository.findById(userId).get();
        System.out.println(user);
        return userRepository.findById(userId).get();
    }

    //public EmployeeDTO employeeDTO(Employee employee){
    //        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
    //        EmployeeDTO employeeDTO = new EmployeeDTO();
    //        employeeDTO = modelMapper.map(employee,EmployeeDTO.class);
    //        return employeeDTO;
    //    }

//    public UserDTO userDTO(User user){
//           modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
//           UserDTO userDTO = new UserDTO();
//           userDTO = modelMapper.map(user,UserDTO.class);
//           return userDTO;
//    }
}
