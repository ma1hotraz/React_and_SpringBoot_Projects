package com.notes.keep.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.FetchType;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;
import lombok.Builder;

import java.sql.Date;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@JsonSerialize(using = CustomArchiveSerializer.class)
@ToString
@Builder
@Data
@Entity
public class Archived {
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
    private boolean archived = false;
    private Date date;
    private String color;
    private String imageBg;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

}

