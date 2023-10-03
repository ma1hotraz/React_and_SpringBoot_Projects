package com.notes.keep.repository;

import com.notes.keep.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User, Integer>{

    public boolean existsByEmail(String email);

    public User findByEmail(String email);

}
