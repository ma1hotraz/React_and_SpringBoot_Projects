package com.notes.keep;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class KeepApplication {
    public static void main(String[] args) {
        SpringApplication.run(KeepApplication.class, args);
    }
}