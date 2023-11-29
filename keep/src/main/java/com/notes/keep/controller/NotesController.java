package com.notes.keep.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.notes.keep.model.Archived;
import com.notes.keep.model.AuthResponse;
import com.notes.keep.model.Notes;
import com.notes.keep.model.Trash;
import com.notes.keep.service.NotesService;
import com.notes.keep.utils.Loggers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Logger;


@RestController
@RequestMapping("/notes")
@PreAuthorize("USER")
@CrossOrigin("*")
public class NotesController {

    @Autowired
    private NotesService notesService;

    @PostMapping("/add")
    public ResponseEntity<?> createNote(@RequestBody Notes note) throws Exception {
        Loggers.info("NOTE CREATED");
        Notes notes = null;
        try {
            notes = notesService.createNote(note);
        } catch (Exception e) {
            return ResponseEntity.status(500).header("msg", "USER NOT FOUND").build();
        }
        if (notes == null) {
            return ResponseEntity.status(200).header("msg", "FIELDS ARE EMPTY").build();
        }
        return ResponseEntity.ok().body(notes);
    }


    @GetMapping("/userId/{id}")
    public ResponseEntity<?> getAllByUserId(@PathVariable UUID id) {
        List<Notes> notesList = notesService.findAllByUserUserId(id);
        if (notesList.isEmpty()) {
            return ResponseEntity.status(204).header("msg", "NO NOTES FOUND WITH THIS USER ID").build();
        }
        return ResponseEntity.ok(notesList);
    }


    @GetMapping("/getNote/{id}")
    public ResponseEntity<?> getNoteById(@PathVariable UUID id) {
        Loggers.info("NOTE WITH ID " + id + " REQUESTED");
        Notes note = notesService.findByNoteId(id);
        if (note == null) {
            return ResponseEntity.noContent().header("msg", "NO NOTE FOUND WITH THIS ID").build();
        }
        return ResponseEntity.ok(note);
    }

    @PutMapping("/noteId/{id}")
    public ResponseEntity<?> updateNoteById(@PathVariable UUID id, @RequestBody Notes notes) {
        Loggers.info("NOTE WITH ID " + id + " UPDATED");
        Notes note = notesService.updateNoteById(id, notes);
        if (note == null) {
            return ResponseEntity.status(400).header("msg", "BAD REQUEST").build();
        }
        return ResponseEntity.ok(note);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable UUID id) {
        Loggers.info("NOTE WITH ID " + id + " DELETED");
        Notes note = notesService.findByNoteId(id);
        if (note == null) {
            return ResponseEntity.noContent().header("msg", "NO CONTENT DELETED BECAUSE IT DOESN'T EXIST").build();
        }
        notesService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/userId/{id}/{title}")
    public ResponseEntity<?> findByTitle(@PathVariable UUID id, @PathVariable String title) {
        Loggers.info("NOTE WITH TITLE : \'" + title.trim() + "\' AND ID : " + id + " REQUESTED");
        if (title.isBlank() || title.isEmpty()) {
            return ResponseEntity.status(204).header("msg", "TITLE IS EMPTY").build();
        }
        List<Notes> notesList = notesService.findByTitle(id, title);
        if (notesList == null) {
            return ResponseEntity.status(204).header("msg", "NO NOTES FOUND WITH THIS TITLE").build();
        }
        //TODO use model mapping to map Notes -> NotesDTO
        return ResponseEntity.ok(notesList);
    }

    @GetMapping("/trash/userId/{id}")
    public ResponseEntity<?> getTrashByUserId(@PathVariable UUID id) {

        List<Trash> notesList = notesService.findAllTrashByUserId(id);
        if (notesList.isEmpty()) {
            return ResponseEntity.status(204).header("msg", "NO NOTES FOUND WITH THIS USER ID").build();
        }
        return ResponseEntity.ok(notesList);
    }

    @DeleteMapping("/trash/userId/{userId}/delete/noteId/{noteId}")
    public ResponseEntity<?> deleteNoteFromTrash(@PathVariable UUID userId, @PathVariable UUID noteId) {

        Boolean deleted = notesService.deleteFromTrash(userId, noteId);
        if (!deleted) {
            return ResponseEntity.status(500).body("SOMETHING WENT WRONG");
        }
        return ResponseEntity.ok("DELETED SUCCESSFULLY");
    }

    @DeleteMapping("/trash/userId/{userId}/restore/noteId/{noteId}")
    public ResponseEntity<?> restoreNoteFromTrash(@PathVariable UUID userId, @PathVariable UUID noteId) {
        Boolean restored = notesService.restoredFromTrash(userId, noteId);
        if (!restored) {
            return ResponseEntity.status(500).body("SOMETHING WENT WRONG");
        }
        return ResponseEntity.ok().body("RESTORED SUCCESSFULLY");
    }


    @GetMapping("/archive/userId/{id}")
    public ResponseEntity<?> getArchiveByUserId(@PathVariable UUID id) {

        List<Archived> notesList = notesService.findAllArchiveByUserId(id);
        if (notesList.isEmpty()) {
            return ResponseEntity.status(204).header("msg", "NO NOTES FOUND WITH THIS USER ID").build();
        }
        return ResponseEntity.ok(notesList);
    }


    @GetMapping("/archive/userId/{userId}/addArchive/noteId/{noteId}")
    public ResponseEntity<?> archiveNote(@PathVariable UUID userId, @PathVariable UUID noteId) {
        boolean archived = notesService.addToArchive(userId, noteId);
        if (!archived) {
            return ResponseEntity.status(500).body("SOMETHING WENT WRONG");
        }
        return ResponseEntity.status(200).body("MOVED TO ARCHIVE");
    }

    @GetMapping("/archive/userId/{userId}/removeArchive/noteId/{noteId}")
    public ResponseEntity<?> deArchiveNote(@PathVariable UUID userId, @PathVariable UUID noteId) {
        boolean archived = notesService.removeFromArchive(userId, noteId);
        if (!archived) {
            return ResponseEntity.status(500).body("SOMETHING WENT WRONG");
        }
        return ResponseEntity.status(200).body("MOVED TO ARCHIVE");
    }


}
