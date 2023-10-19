package com.notes.keep;

import com.notes.keep.config.SecurityConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
public class KeepApplication {
    public static void main(String[] args) {
        SpringApplication.run(KeepApplication.class, args);
    }
}