package com.notes.keep.dto;


import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class UserDTO {
    private Integer userId;
    private String name;
    private String email;
}
