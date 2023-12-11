package com.notes.keep;

import com.notes.keep.model.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class KeepApplication {
    public static void main(String[] args) {
        SpringApplication.run(KeepApplication.class, args);
    }
}