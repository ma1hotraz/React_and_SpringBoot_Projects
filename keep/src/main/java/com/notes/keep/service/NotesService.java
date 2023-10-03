package com.notes.keep.service;

import com.notes.keep.model.Notes;
import com.notes.keep.model.User;
import com.notes.keep.repository.NotesRepository;
import com.notes.keep.repository.UserRepository;
import com.notes.keep.utils.FormatDateTime;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class NotesService {
    private final NotesRepository notesRepository;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    public NotesService(NotesRepository notesRepository) {
        this.notesRepository = notesRepository;
    }


    public Notes createNote(Notes note) throws Exception {
        try{
            Optional<User> user = userRepository.findById(note.getUser().getUserId());
            note.setUser(user.get());
            note.setDate(FormatDateTime.parseStandardDate(note.getDate()));
        }catch (Exception e){
            throw new Exception(e);
        }
        return notesRepository.save(note);
    }

    public List<Notes> notesList() {
        return notesRepository.findAll();
    }

    public Notes findByNoteId(Integer id) {
        return notesRepository.findByNoteId(id);
    }

    public Notes updateNoteById(Integer id, Notes notes) {
        Notes oldNote = notesRepository.findByNoteId(id);
//        oldNote.setColor(notes.getColor());
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
        System.out.println(notesRepository.findByTitle(title));
        return notesRepository.findByTitle(title);
    }


    public List<Notes> findAllByUserUserId(Integer userId){
        System.out.println(notesRepository.findAllByUserUserId(userId));
        return notesRepository.findAllByUserUserId(userId);
    }
}

