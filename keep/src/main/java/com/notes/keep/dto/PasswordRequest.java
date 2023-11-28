package com.notes.keep.dto;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class PasswordRequest {

    private String email;
    private String password;
    private String token;
}
