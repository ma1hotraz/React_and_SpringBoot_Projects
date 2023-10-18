package com.notes.keep;

import com.notes.keep.config.SecurityConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
public class KeepApplication {
    public static void main(String[] args) {
        String logsDirectoryPath = System.getProperty("user.dir") + "/logs/";
        System.setProperty("logging.file.path", logsDirectoryPath);
        SpringApplication.run(KeepApplication.class, args);
    }
}