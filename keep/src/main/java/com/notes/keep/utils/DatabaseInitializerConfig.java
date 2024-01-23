package com.notes.keep.utils;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializerConfig {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @PostConstruct
    public void initializeDatabase() {
        // Execute your SQL queries here
        jdbcTemplate.execute("CREATE DATABASE IF NOT EXISTS test_db");
        System.out.println("Default user has been inserted into the database.");
        System.out.println("Default user exist in the database.");
    }

}