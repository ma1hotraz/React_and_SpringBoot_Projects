package com.notes.keep.repository;

import com.notes.keep.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Optional;


@EnableJpaRepositories
public interface AdminRepository extends JpaRepository<Admin, String> {
    Optional<Admin> findByEmail(String email);
    Boolean existsByEmail(String email);
    @Query(nativeQuery = true, value = "SELECT SUM(data_length + index_length) / 1024 / 1024 " +
            "FROM information_schema.TABLES WHERE table_schema = (SELECT DATABASE())")
    Double sizeOfDB();
}
