package com.notes.keep.repository;

import com.notes.keep.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@EnableJpaRepositories
public interface AdminRepository extends JpaRepository<Admin, String> {

    @Query(nativeQuery = true, value = "SELECT SUM(data_length + index_length) / 1024 / 1024 " +
            "FROM information_schema.TABLES WHERE table_schema = (SELECT DATABASE())")
    Double sizeOfDB();
}
