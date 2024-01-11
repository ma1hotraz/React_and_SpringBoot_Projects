package com.notes.keep.service;

import com.notes.keep.config.jwt.JwtService;
import com.notes.keep.model.Archived;
import com.notes.keep.model.Notes;
import com.notes.keep.model.Trash;
import com.notes.keep.model.User;
import com.notes.keep.repository.ArchivedRepository;
import com.notes.keep.repository.NotesRepository;
import com.notes.keep.repository.TrashRepository;
import com.notes.keep.repository.UserRepository;
import com.notes.keep.utils.EncryptionUtil;
import com.notes.keep.utils.Loggers;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import java.util.UUID;
import java.util.Optional;
import java.util.Iterator;
import java.util.stream.Collectors;

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
    private TrashRepository trashRepository;

    @Autowired
    private ArchivedRepository archivedRepository;

    @Autowired
    private JwtService jwtService;

    @Value("${secret-key}")
    private String SECRET_KEY;

    @Autowired
    public NotesService(NotesRepository notesRepository) {
        this.notesRepository = notesRepository;
    }

    public Notes createNote(Notes note, String authToken) throws Exception {
        if (validateToken(authToken).isEmpty()) {
            throw new Exception("Token Expired");
        }
        UUID uid = validateToken(authToken).get().getUserId();
        Optional<User> user = userRepository.findById(uid);
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

    public Notes findByNoteId(UUID noteId, String authToken) throws Exception {
        if (validateToken(authToken).isEmpty()) {
            throw new Exception("Token Expired");
        }
        Notes note = notesRepository.findByNoteId(noteId);
        try {
            note.setTitle(encryptionUtil.decrypt(note.getTitle()));
            note.setDescription(encryptionUtil.decrypt(note.getDescription()));
        } catch (NullPointerException e) {
            return null;
        }
        return note;
    }

    public Notes updateNoteById(Notes notes, String authToken) throws Exception {
        if (validateToken(authToken).isEmpty()) {
            throw new Exception("Token Expired");
        }
        UUID uid = validateToken(authToken).get().getUserId();
        Notes oldNote = notesRepository.findByNoteId(uid);
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

    public void deleteById(UUID id, String authToken) throws Exception {
        if (validateToken(authToken).isEmpty()) {
            throw new Exception("Token Expired");
        }
        Notes note = notesRepository.findByNoteId(id);
        note.setDeleted(true);
        Trash deletedNote =
                Trash.builder()
                        .noteId(note.getNoteId())
                        .title(note.getTitle())
                        .description(note.getDescription())
                        .completed(note.isCompleted())
                        .deleted(note.isDeleted())
                        .date(note.getDate())
                        .color(note.getColor())
                        .imageBg(note.getImageBg())
                        .user(note.getUser())
                        .build();

        trashRepository.save(deletedNote);
        notesRepository.deleteById(id);
    }


    public List<Notes> findByTitle(String title, String token) throws Exception {
        return findAllByUserUser(token)
                .stream()
                .filter(notes -> notes.getTitle().toLowerCase().contains(title.toLowerCase()))
                .collect(Collectors.toList());
    }


    public List<Notes> findAllByUserUser(String authToken) throws Exception {
        if (validateToken(authToken).isEmpty()) {
            throw new Exception("Token Expired");
        }
        UUID uid = validateToken(authToken).get().getUserId();
        List<Notes> notesList = notesRepository.findAllNotesByUserId(uid);
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

    public List<Trash> findAllTrashByUser(String authToken) throws Exception {
        if (validateToken(authToken).isEmpty()) {
            throw new Exception("Token Expired");
        }
        UUID uid = validateToken(authToken).get().getUserId();
        List<Trash> notesList = trashRepository.findAllNotesByUserId(uid);
        List<Trash> collected;
        try {
            collected = new ArrayList<>(notesList);

        } catch (NullPointerException e) {
            throw new NullPointerException("LIST IS EMPTY");
        }

        return collected;
    }

    public List<Archived> findAllArchiveByUser(String authToken) throws Exception {
        if (validateToken(authToken).isEmpty()) {
            throw new Exception("Token Expired");
        }
        UUID uid = validateToken(authToken).get().getUserId();
        List<Archived> notesList = archivedRepository.findAll();
        List<Archived> collected = new ArrayList<>();
        try {
            for (Archived archived : notesList) {
                if (archived.getUser().getUserId().equals(uid)) {
                    archived.setTitle(encryptionUtil.decrypt(archived.getTitle()));
                    archived.setDescription(encryptionUtil.decrypt(archived.getDescription()));
                    collected.add(archived);
                }
            }
        } catch (NullPointerException e) {
            throw new NullPointerException("LIST IS EMPTY");
        }
        return collected;
    }

    public Boolean deleteFromTrash(UUID noteId, String authToken) throws Exception {
        if (validateToken(authToken).isEmpty()) {
            throw new Exception("Token Expired");
        }
        try {
            trashRepository.deleteById(noteId);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public Boolean restoredFromTrash(UUID noteId, String authToken) throws Exception {
        if (validateToken(authToken).isEmpty()) {
            throw new Exception("Token Expired");
        }
        try {
            UUID uid = validateToken(authToken).get().getUserId();
            List<Trash> trashList = trashRepository.findAllNotesByUserId(uid);
            Notes note = null;
            for (Trash trash : trashList) {
                if (trash.getNoteId().equals(noteId)) {
                    note = Notes.builder()
                            .noteId(trash.getNoteId())
                            .title(encryptionUtil.encrypt(trash.getTitle()))
                            .description(encryptionUtil.encrypt(trash.getDescription()))
                            .completed(trash.isCompleted())
                            .deleted(false)
                            .date(trash.getDate())
                            .color(trash.getColor())
                            .imageBg(trash.getImageBg())
                            .user(trash.getUser())
                            .build();
                    break;
                }
            }
            if (note == null) {
                return false;
            }
            trashRepository.deleteById(noteId);
            notesRepository.save(note);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }

    public boolean addToArchive(UUID noteId, String authToken) throws Exception {
        if (validateToken(authToken).isEmpty()) {
            throw new Exception("Token Expired");
        }
        try {
            UUID uid = validateToken(authToken).get().getUserId();
            List<Notes> notesList = notesRepository.findAll();
            List<Notes> notesByUserId = notesList.stream().filter(note -> note.getUser().getUserId().equals(uid)).collect(Collectors.toList());

            Iterator<Notes> it = notesByUserId.iterator();
            while (it.hasNext()) {
                Notes notes = it.next();
                if (notes.getNoteId().equals(noteId)) {
                    Archived archive =
                            Archived.
                                    builder().noteId(notes.getNoteId())
                                    .title(notes.getTitle())
                                    .description(notes.getDescription())
                                    .completed(notes.isCompleted())
                                    .archived(true)
                                    .date(notes.getDate())
                                    .color(notes.getColor())
                                    .imageBg(notes.getImageBg())
                                    .user(notes.getUser())
                                    .build();
                    archivedRepository.save(archive);
                    notesRepository.deleteById(noteId);
                    break;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public boolean removeFromArchive(UUID noteId, String authToken) throws Exception {
        if (validateToken(authToken).isEmpty()) {
            throw new Exception("Token Expired");
        }
        try {
            UUID uid = validateToken(authToken).get().getUserId();
            List<Archived> archivedList = archivedRepository.findAll();
            List<Archived> archivedByUserId = archivedList.stream()
                    .filter(notes -> notes.getUser().getUserId().equals(uid))
                    .toList();

            if (archivedByUserId.isEmpty()) {
                return false;
            }

            for (Archived archived : archivedByUserId) {
                Archived note = archived;
                if (note.getNoteId().equals(noteId)) {
                    Notes notes = Notes.builder().noteId(note.getNoteId())
                            .title(note.getTitle())
                            .description(archived.getDescription())
                            .completed(archived.isCompleted())
                            .date(archived.getDate())
                            .color(archived.getColor())
                            .imageBg(archived.getImageBg())
                            .user(archived.getUser())
                            .build();
                    notesRepository.save(notes);
                }
            }
            archivedRepository.deleteById(noteId);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public Optional<User> validateToken(String token) {
        Optional<User> user = null;
        if (token.isEmpty() || token.isBlank())
            return user;
        try {
            token = token.replace("Bearer", "");
            token = token.trim();
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            System.out.println("claims : " + claimsJws);
            user = userRepository.findByEmail(claimsJws.getBody().getSubject());
            if(!jwtService.isTokenValid(token, user.get())){
                throw new MalformedJwtException("INVALID TOKEN");
            }
            return user;
        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException |
                 IllegalArgumentException e) {
            return user;
        }
    }
}
