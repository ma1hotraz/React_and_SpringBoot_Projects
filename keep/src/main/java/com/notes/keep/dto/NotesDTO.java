package com.notes.keep.dto;

import lombok.Data;
import lombok.ToString;

import java.util.UUID;

@ToString
@Data
public class NotesDTO {
    private UUID noteId;
    private String title;
    private String description;
    private boolean completed;
    private String date;
    private String color;
    private String imageBg;
}
