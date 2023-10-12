package com.notes.keep.controller;

import com.notes.keep.model.Notes;
import com.notes.keep.service.NotesService;
import com.notes.keep.utils.Loggers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/notes")
//@PreAuthorize("USER")
public class NotesController {

    @Autowired
    private NotesService notesService;

    @PostMapping("/add")
    public ResponseEntity<?> createNote(@RequestBody Notes note) throws Exception {
        Loggers.info("NOTE CREATED");
        System.out.println(note);
        Notes notes = notesService.createNote(note);
        if (notes == null) {
            return ResponseEntity.status(200).header("msg", "FIELDS ARE EMPTY").build();
        }
        System.out.println(notes);
        return ResponseEntity.ok().body(notes);
    }


    @GetMapping("/userId/{id}")
    public ResponseEntity<?> getAllByUserId(@PathVariable UUID id) {

        List<Notes> notesList = notesService.findAllByUserUserId(id);
        if (notesList.isEmpty()) {
            return ResponseEntity.status(204).header("msg", "NO NOTES FOUND WITH THIS USER ID").build();
        }
        System.out.println(notesList);
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


}
