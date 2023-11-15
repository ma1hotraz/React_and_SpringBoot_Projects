package com.notes.keep.model;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthRequest {
    private String email;
    private String password;
}
