package com.notes.keep.repository;

import com.notes.keep.model.Trash;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.UUID;

@EnableJpaRepositories
public interface TrashRepository extends JpaRepository<Trash, UUID> {
}
