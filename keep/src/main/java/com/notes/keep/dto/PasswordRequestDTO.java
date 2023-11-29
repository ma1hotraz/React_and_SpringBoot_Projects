package com.notes.keep.dto;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class PasswordRequestDTO {

    private String email;
    private String password;
    private String token;
}
