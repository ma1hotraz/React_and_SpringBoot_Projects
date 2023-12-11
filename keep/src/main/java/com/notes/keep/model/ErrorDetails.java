package com.notes.keep.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class ErrorDetails {
    LocalDateTime timestamp;
    String message;
    String details;
}
