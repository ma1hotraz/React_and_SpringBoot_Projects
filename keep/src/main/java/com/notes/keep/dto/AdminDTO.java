package com.notes.keep.dto;

import com.notes.keep.model.AuthResponse;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;


@Builder
@ToString
@Data
public class AdminDTO {
    private String email;
    private String name;
    private String role;
    private AuthResponse response;
}
