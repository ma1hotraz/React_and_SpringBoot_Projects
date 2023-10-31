package com.notes.keep.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.ToString;

import java.util.Date;
import java.util.UUID;

@ToString
@Data
@Entity
public class Trash {
    @Id
    private UUID noteId;
    private Notes note;
    private Boolean deleted;
    private Date deletedOn;

}
