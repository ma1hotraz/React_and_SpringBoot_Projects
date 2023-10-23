package com.notes.keep.service;

import com.notes.keep.model.Notes;
import com.notes.keep.model.User;
import com.notes.keep.repository.NotesRepository;
import com.notes.keep.repository.UserRepository;
import com.notes.keep.utils.EncryptionUtil;
import com.notes.keep.utils.Loggers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.stream.Collectors;
import java.util.Optional;
import java.util.Date;
import java.util.UUID;
import java.util.List;
import java.util.ArrayList;

@Service
public class NotesService {
    private final NotesRepository notesRepository;
    @Autowired
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
        Optional<User> user = userRepository.findById(note.getUser().getUserId());
        try {
            note.setDescription(note.getDescription().replaceAll("\\s+", " "));
            note.setUser(user.get());


            Date utilDate = new Date();
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            String formattedDate = dateFormat.format(utilDate);
            try {
                Date date = dateFormat.parse(formattedDate);
                java.sql.Date sqlDate = new java.sql.Date(date.getTime());
                note.setDate(sqlDate);
            } catch (Exception e) {
                e.printStackTrace();
            }


            note.setTitle(encryptionUtil.encrypt(note.getTitle()));
            note.setDescription(encryptionUtil.encrypt(note.getDescription()));
        } catch (Exception e) {
            throw new Exception(e);
        }
        Loggers.info("NOTE CREATED BY EMAIL : " + user.get().getEmail());
        return notesRepository.save(note);
    }

    public Notes findByNoteId(UUID id) {
        Notes note = notesRepository.findByNoteId(id);
        try {
            note.setTitle(encryptionUtil.decrypt(note.getTitle()));
            note.setDescription(encryptionUtil.decrypt(note.getDescription()));
        } catch (NullPointerException e) {
            return null;
        }
        return note;
    }

    public Notes updateNoteById(UUID id, Notes notes) {
        Notes oldNote = notesRepository.findByNoteId(id);
        System.out.println(oldNote);
        if (oldNote == null) {
            return null;
        }
//        oldNote.setColor(notes.getColor());

        Date utilDate = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        String formattedDate = dateFormat.format(utilDate);
        try {
            Date date = dateFormat.parse(formattedDate);
            java.sql.Date sqlDate = new java.sql.Date(date.getTime());
            notes.setDate(sqlDate);
        } catch (Exception e) {
            e.printStackTrace();
        }

        oldNote.setTitle(notes.getTitle());
        oldNote.setDescription(notes.getDescription().replaceAll("\\s+", " "));
        oldNote.setCompleted(notes.isCompleted());

        //ENCRYPTING THE NOTE AFTER UPDATE
        oldNote.setTitle(encryptionUtil.encrypt(oldNote.getTitle()));
        oldNote.setDescription(encryptionUtil.encrypt(oldNote.getDescription()));
        notesRepository.save(oldNote);
        return oldNote;
    }

    public void deleteById(UUID id) {
        notesRepository.deleteById(id);
    }


    public List<Notes> findByTitle(UUID id, String title) {
        return findAllByUserUserId(id)
                .stream()
                .filter(notes -> notes.getTitle().toLowerCase().contains(title.toLowerCase()))
                .collect(Collectors.toList());
    }


    public List<Notes> findAllByUserUserId(UUID userId) {
        List<Notes> notesList = notesRepository.findAllNotesByUserId(userId);
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
