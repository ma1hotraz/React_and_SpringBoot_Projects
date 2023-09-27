package com.notes.keep.repository;

import com.notes.keep.model.Notes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotesRepository extends JpaRepository<Notes, Integer> {
    Notes findByNoteId(Integer id);

    List<Notes> findByTitle(String title);

    @Query("SELECT n FROM Notes n WHERE n.user.userId = :userId")
    List<Notes> findAllByUserUserId(@Param("userId") Integer userId);
}

