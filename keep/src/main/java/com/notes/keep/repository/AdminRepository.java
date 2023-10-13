package com.notes.keep.repository;

import com.notes.keep.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface AdminRepository extends JpaRepository<Admin, String> {
}
