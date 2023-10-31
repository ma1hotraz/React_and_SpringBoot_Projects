package com.notes.keep.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.Data;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.sql.Date;
import java.util.UUID;


@AllArgsConstructor
@NoArgsConstructor
@JsonSerialize(using = CustomNotesSerializer.class)
@ToString
@Data
@Entity
public class Notes {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID noteId;

    @NotNull
    @NotBlank
    private String title;

    @NotNull
    @NotBlank
    private String description;

    private boolean completed;
    private boolean deleted = false;
    private Date date;
    private String color;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;
}
