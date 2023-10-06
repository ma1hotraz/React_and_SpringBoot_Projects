package com.notes.keep.dto;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class NotesDTO {
    private Integer noteId;
    private String title;
    private String description;
    private boolean completed;
    private String date;
    private String color;
}
