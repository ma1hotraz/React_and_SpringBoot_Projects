package com.notes.keep.service;

import com.notes.keep.model.Notes;
import com.notes.keep.repository.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotesService {
    private final NotesRepository notesRepository;

    @Autowired
    public NotesService(NotesRepository notesRepository) {
        this.notesRepository = notesRepository;
    }

    public Notes createNote(Notes note){
        return notesRepository.save(note);
    }

    public List<Notes> notesList(){
        return notesRepository.findAll();
    }

    public List<Notes> getNoteByTitle(String title){
        return  notesRepository.findByTitle(title);
    }

    public List<Notes> getByUserId(Integer id){
        return notesRepository.findByUserId(id);
    }

}

