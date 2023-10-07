package com.notes.keep.service;

import com.notes.keep.model.Notes;
import com.notes.keep.model.User;
import com.notes.keep.repository.NotesRepository;
import com.notes.keep.repository.UserRepository;
import com.notes.keep.utils.EncryptionUtil;
import com.notes.keep.utils.FormatDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NotesService {
    private final NotesRepository notesRepository;
    public BCryptPasswordEncoder encoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EncryptionUtil encryptionUtil;

    @Autowired
    public NotesService(NotesRepository notesRepository) {
        this.notesRepository = notesRepository;
    }

    public Notes createNote(Notes note) throws Exception {
        try {
            Optional<User> user = userRepository.findById(note.getUser().getUserId());
            note.setUser(user.get());
            note.setDate(FormatDateTime.parseStandardDate(note.getDate()));
            note.setTitle(encryptionUtil.encrypt(note.getTitle()));
            note.setDescription(encryptionUtil.encrypt(note.getDescription()));
        } catch (Exception e) {
            throw new Exception(e);
        }
        return notesRepository.save(note);
    }

    public Notes findByNoteId(Integer id) {
        Notes note = notesRepository.findByNoteId(id);
        try {
            note.setTitle(encryptionUtil.decrypt(note.getTitle()));
            note.setDescription(encryptionUtil.decrypt(note.getDescription()));
        } catch (NullPointerException e) {
            return null;
        }
        return note;
    }

    public Notes updateNoteById(Integer id, Notes notes) {
        Notes oldNote = notesRepository.findByNoteId(id);
        if (oldNote == null) {
            return null;
        }
//        oldNote.setColor(notes.getColor());
        oldNote.setDate(FormatDateTime.parseStandardDate(notes.getDate()));
        oldNote.setTitle(notes.getTitle());
        oldNote.setDescription(notes.getDescription());
        oldNote.setCompleted(notes.isCompleted());

        //ENCRYPTING THE NOTE AFTER UPDATE
        oldNote.setTitle(encryptionUtil.encrypt(oldNote.getTitle()));
        oldNote.setDescription(encryptionUtil.encrypt(oldNote.getDescription()));
        notesRepository.save(oldNote);
        return oldNote;
    }

    public void deleteById(Integer id) {
        notesRepository.deleteById(id);
    }


    public List<Notes> findByTitle(Integer id, String title) {

        return findAllByUserUserId(id)
                .stream()
                .filter(notes -> notes.getTitle().contains(title))
                .collect(Collectors.toList());
    }


    public List<Notes> findAllByUserUserId(Integer userId) {
        List<Notes> notesList = notesRepository.findAllNotesByuserId(userId);
        List<Notes> collected = new ArrayList<>();

        try {
            collected = notesList.stream()
                    .peek(note -> {
                        note.setTitle(encryptionUtil.decrypt(note.getTitle()));
                        note.setDescription(encryptionUtil.decrypt(note.getDescription()));
                    })
                    .toList();

        } catch (NullPointerException e) {
            throw new NullPointerException("LIST IS EMPTY");
        }

        return collected;
    }
}
