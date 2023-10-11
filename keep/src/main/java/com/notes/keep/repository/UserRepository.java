package com.notes.keep.repository;

import com.notes.keep.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Optional;
import java.util.UUID;

@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User, UUID>{

    public boolean existsByEmail(String email);

    public User findByEmail(String email);

    Optional<User> findById(UUID userId);
}
