package com.notes.keep.controller;

import com.notes.keep.model.Archived;
import com.notes.keep.model.Notes;
import com.notes.keep.model.Trash;
import com.notes.keep.service.NotesService;
import com.notes.keep.utils.Loggers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/notes")
@PreAuthorize("USER")
@CrossOrigin(origins = "*")
public class NotesController {

    @Autowired
    private NotesService notesService;

    @PostMapping("/add")
    public ResponseEntity<?> createNote(@RequestBody Notes note, @RequestHeader("Authorization") String authToken) throws Exception {
        Notes notes = null;
        try {
            notes = notesService.createNote(note, authToken);
        } catch (Exception e) {
            return ResponseEntity.status(500).header("msg", "USER NOT FOUND").build();
        }
        if (notes == null) {
            return ResponseEntity.status(200).header("msg", "FIELDS ARE EMPTY").build();
        }
        return ResponseEntity.ok().body(notes);
    }


    @GetMapping("/userId/")
    public ResponseEntity<?> getAllByUser(@RequestHeader("Authorization") String authToken) throws Exception {
        List<Notes> notesList = notesService.findAllByUserUser(authToken);
        if (notesList.isEmpty()) {
            return ResponseEntity.status(204).header("msg", "NO NOTES FOUND WITH THIS USER ID").build();
        }
        return ResponseEntity.ok(notesList);
    }


    @GetMapping("/getNote/{noteId}")
    public ResponseEntity<?> getNoteById(@PathVariable UUID noteId, @RequestHeader("Authorization") String authToken) throws Exception {
        Notes note = notesService.findByNoteId(noteId,authToken);
        if (note == null) {
            return ResponseEntity.noContent().header("msg", "NO NOTE FOUND WITH THIS ID").build();
        }
        return ResponseEntity.ok(note);
    }

    @PutMapping("/noteId/{id}")
    public ResponseEntity<?> updateNoteById(@PathVariable UUID id, @RequestBody Notes notes, @RequestHeader("Authorization") String authToken) throws Exception {
        Loggers.info("NOTE WITH ID " + id + " UPDATED");
        Notes note = notesService.updateNoteById(notes, authToken);
        if (note == null) {
            return ResponseEntity.status(400).header("msg", "BAD REQUEST").build();
        }
        return ResponseEntity.ok(note);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable UUID id, @RequestHeader("Authorization") String authToken) throws Exception {
        Loggers.info("NOTE WITH ID " + id + " DELETED");
        Notes note = notesService.findByNoteId(id, authToken);
        if (note == null) {
            return ResponseEntity.noContent().header("msg", "NO CONTENT DELETED BECAUSE IT DOESN'T EXIST").build();
        }
        notesService.deleteById(id, authToken);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search/{title}")
    public ResponseEntity<?> findByTitle(@PathVariable String title, @RequestHeader("Authorization") String authToken) throws Exception {
        Loggers.info("NOTE WITH TITLE : \'" + title.trim() + " REQUESTED");
        if (title.isBlank() || title.isEmpty()) {
            return ResponseEntity.status(204).header("msg", "TITLE IS EMPTY").build();
        }
        List<Notes> notesList = notesService.findByTitle(title, authToken);
        if (notesList == null) {
            return ResponseEntity.status(204).header("msg", "NO NOTES FOUND WITH THIS TITLE").build();
        }
        //TODO use model mapping to map Notes -> NotesDTO
        return ResponseEntity.ok(notesList);
    }

    @GetMapping("/trash/")
    public ResponseEntity<?> getTrashByUser(@RequestHeader("Authorization") String authToken) throws Exception {
        List<Trash> notesList = notesService.findAllTrashByUser(authToken);
        if (notesList.isEmpty()) {
            return ResponseEntity.status(204).header("msg", "NO NOTES FOUND WITH THIS USER ID").build();
        }
        return ResponseEntity.ok(notesList);
    }

    @DeleteMapping("/trash/delete/noteId/{noteId}")
    public ResponseEntity<?> deleteNoteFromTrash(@PathVariable UUID noteId, @RequestHeader("Authorization") String authToken) throws Exception {
        Boolean deleted = notesService.deleteFromTrash(noteId, authToken);
        if (!deleted) {
            return ResponseEntity.status(500).body("SOMETHING WENT WRONG");
        }
        return ResponseEntity.ok("DELETED SUCCESSFULLY");
    }

    @DeleteMapping("/trash/restore/noteId/{noteId}")
    public ResponseEntity<?> restoreNoteFromTrash(@PathVariable UUID noteId, @RequestHeader("Authorization") String authToken) throws Exception {
        Boolean restored = notesService.restoredFromTrash(noteId, authToken);
        if (!restored) {
            return ResponseEntity.status(500).body("SOMETHING WENT WRONG");
        }
        return ResponseEntity.ok().body("RESTORED SUCCESSFULLY");
    }


    @GetMapping("/archive/")
    public ResponseEntity<?> getArchiveByUser(@RequestHeader("Authorization") String authToken) throws Exception {
        List<Archived> notesList = notesService.findAllArchiveByUser(authToken);
        if (notesList.isEmpty()) {
            return ResponseEntity.status(204).header("msg", "NO NOTES FOUND WITH THIS USER ID").build();
        }
        return ResponseEntity.ok(notesList);
    }


    @GetMapping("/archive/addArchive/noteId/{noteId}")
    public ResponseEntity<?> archiveNote(@PathVariable UUID noteId, @RequestHeader("Authorization") String authToken) throws Exception {
        boolean archived = notesService.addToArchive(noteId, authToken);
        if (!archived) {
            return ResponseEntity.status(500).body("SOMETHING WENT WRONG");
        }
        Loggers.info("NOTE WITH ID " + noteId + "IS ADDED TO ARCHIVES");
        return ResponseEntity.status(200).body("MOVED TO ARCHIVE");
    }

    @GetMapping("/archive/removeArchive/noteId/{noteId}")
    public ResponseEntity<?> deArchiveNote(@PathVariable UUID noteId, @RequestHeader("Authorization") String authToken) throws Exception {
        boolean archived = notesService.removeFromArchive(noteId, authToken);
        if (!archived) {
            return ResponseEntity.status(500).body("SOMETHING WENT WRONG");
        }
        Loggers.info("NOTE WITH ID " + noteId + "IS REMOVED FROM ARCHIVES");
        return ResponseEntity.status(200).body("MOVED TO ARCHIVE");
    }


}
