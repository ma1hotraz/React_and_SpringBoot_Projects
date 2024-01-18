package com.notes.keep.dto;

import com.notes.keep.model.AuthResponse;
import lombok.Builder;
import lombok.ToString;
import lombok.Data;


@Builder
@ToString
@Data
public class UserDTO {
    private String name;
    private String email;
    private byte[] image;
    private AuthResponse response;
}
