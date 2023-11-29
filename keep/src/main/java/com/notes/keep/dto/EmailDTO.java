package com.notes.keep.dto;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class EmailDTO {
    private String to;
    private String subject;
    private String message;
}
