package com.notes.keep.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
@Entity
public class Admin {
    @Id
    private String email;
    private String firstName;
    private String lastName;
    private String Role;
}
