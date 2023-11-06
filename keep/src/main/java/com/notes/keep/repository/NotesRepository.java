package com.notes.keep.repository;

import com.notes.keep.model.Notes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

@EnableJpaRepositories
public interface NotesRepository extends JpaRepository<Notes, UUID> {
    Notes findByNoteId(UUID id);

    @Query("SELECT n FROM Notes n WHERE n.user.userId = :userId")
    List<Notes> findAllNotesByUserId(@Param("userId") UUID userId);
}

