package com.notes.keep.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.Date;
import java.util.UUID;


@Builder
@ToString
@Data
public class UserDTODate {
    private UUID userId;
    private String name;
    private String email;
    private byte[] image;
    private Date date;
}

