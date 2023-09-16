package com.notes.keep.controller;

import com.notes.keep.model.Notes;
import com.notes.keep.service.NotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notes")
public class NotesController {

    @Autowired
    private NotesService notesService;

    @PostMapping("/add")
    public ResponseEntity<?> createNote(@RequestBody Notes note){
         return ResponseEntity.ok(notesService.createNote(note));
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllNotes(){
        return ResponseEntity.ok(notesService.notesList());
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<?> getByTitle(@PathVariable String title){
        return ResponseEntity.ok(notesService.getNoteByTitle(title));
    }

    @GetMapping("/userId/{id}")
    public ResponseEntity<?> getByUserId(@PathVariable Integer id){
        return ResponseEntity.ok(notesService.getByUserId(id));
    }


}
