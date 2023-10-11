package com.notes.keep.dto;


import lombok.Data;
import lombok.ToString;

import java.util.UUID;

@ToString
@Data
public class UserDTO {
    private UUID userId;
    private String name;
    private String email;
    private byte[] image;
}
