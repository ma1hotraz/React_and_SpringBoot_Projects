package com.notes.keep.repository;

import com.notes.keep.model.Trash;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface TrashRepository extends JpaRepository<Trash, UUID> {

    @Query("SELECT t FROM Trash t WHERE t.user.userId = :userId")
    List<Trash> findAllNotesByUserId(@Param("userId") UUID userId);
}
