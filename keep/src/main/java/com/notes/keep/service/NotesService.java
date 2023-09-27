package com.notes.keep.service;

import com.notes.keep.model.Notes;
import com.notes.keep.model.User;
import com.notes.keep.repository.NotesRepository;
import com.notes.keep.utils.FormatDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class NotesService {
    private final NotesRepository notesRepository;

    @Autowired
    public NotesService(NotesRepository notesRepository) {
        this.notesRepository = notesRepository;
    }

    public Notes createNote(Notes note) {
        note.setDate(FormatDateTime.parseStandardDate(note.getDate()));
        System.out.println(note);
        return notesRepository.save(note);
    }

    public List<Notes> notesList() {
        return notesRepository.findAll();
    }

//    public List<Notes> notesListByUserId(Integer id){
//        return notesRepository.findByUserId(id);
//    }

    public Notes findByNoteId(Integer id) {
        return notesRepository.findByNoteId(id);
    }

    public Notes updateNoteById(Integer id, Notes notes) {
        Notes oldNote = notesRepository.findByNoteId(id);
        oldNote.setColor(notes.getColor());
        oldNote.setDate(FormatDateTime.parseStandardDate(notes.getDate()));
        oldNote.setTitle(notes.getTitle());
        oldNote.setDescription(notes.getDescription());
        oldNote.setCompleted(notes.isCompleted());
        notesRepository.save(oldNote);
        return oldNote;
    }

    public void deleteById(Integer id) {
        notesRepository.deleteById(id);
    }

    public List<Notes> findByTitle(String title){
        System.out.println("FIND BY TITLE CALLED ");
        System.out.println(notesRepository.findByTitle(title));
        return notesRepository.findByTitle(title);
    }

}

