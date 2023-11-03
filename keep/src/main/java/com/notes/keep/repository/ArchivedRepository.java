package com.notes.keep.repository;

import com.notes.keep.model.Archived;
import com.notes.keep.model.Trash;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

@EnableJpaRepositories
public interface ArchivedRepository extends JpaRepository<Archived, UUID> {
    @Query("SELECT a FROM Trash a WHERE a.user.userId = :userId")
    List<Archived> findAllNotesByUserId(@Param("userId") UUID userId);
}
