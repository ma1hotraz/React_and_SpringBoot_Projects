package com.notes.keep.service;

import org.apache.commons.io.input.Tailer;
import org.apache.commons.io.input.TailerListenerAdapter;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

@Service
public class LogTailerService {
//
//    private final String logFileName = "myapp.log";
//
//    public Flux<String> readLogFile() {
//        String filePath;
//        String fileName = logFileName;
//        if (!fileName.isEmpty()) {
//            filePath = "./logs/" + fileName;
//        } else {
//            filePath = logFileName;
//        }
//
//        return Flux.create(sink -> {
//            try {
//                Files.lines(Path.of(filePath))
//                        .forEach(sink::next);
//                sink.complete();
//            } catch (Exception e) {
//                sink.error(e);
//            }
//        });
//    }

}


