package com.notes.keep.controller;

import com.notes.keep.model.Notes;
import com.notes.keep.service.NotesService;
import com.notes.keep.utils.Loggers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/notes")
public class NotesController {

    @Autowired
    private NotesService notesService;

    @PostMapping("/add")
    public ResponseEntity<?> createNote(@RequestBody Notes note) {
        Loggers.info("NOTE CREATED");
        return ResponseEntity.ok(notesService.createNote(note));
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllNotes() {
        Loggers.info("ALL NOTE FETCHED");
        return ResponseEntity.ok(notesService.notesList());
    }

//    @GetMapping("/getAll/userId/{id}")
//    public ResponseEntity<?> getAllByUserId(@PathVariable Integer id) {
//        return ResponseEntity.ok(notesService.notesListByUserId(id));
//    }

    @GetMapping("/getNote/{id}")
    public ResponseEntity<?> getNoteById(@PathVariable Integer id) {
        Loggers.info("NOTE WITH ID " + id + " REQUESTED");
        return ResponseEntity.ok(notesService.findByNoteId(id));
    }

    @PutMapping("/noteId/{id}")
    public ResponseEntity<?> updateNoteById(@PathVariable Integer id, @RequestBody Notes notes) {
        Loggers.info("NOTE WITH ID " + id + " UPDATED");
        System.out.println(notes);
        return ResponseEntity.ok(notesService.updateNoteById(id, notes));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Integer id) {
        Loggers.info("NOTE WITH ID " + id + " DELETED");
        notesService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getByTitle/{title}")
    public ResponseEntity<?> findByTitle(@PathVariable String title){
        Loggers.info("NOTE WITH TITLE " + title + " CALLED AT " + System.currentTimeMillis());
        return ResponseEntity.ok(notesService.findByTitle(title));
    }


}
