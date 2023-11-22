package com.notes.keep.controller;

//import com.notes.keep.service.LogTailerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.stream.Collectors;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin/logs")
public class LogTailerController {

    @Autowired
//    public LogTailerService service;

    @GetMapping("/tail-log")
    public List<String> tailLog() throws IOException, InterruptedException {
        return null;
    }

    @GetMapping(path = "/stream-flux", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamFlux() {
//        return service.readLogFile();
//    }
        return null;
//        return Flux.interval(Duration.ofSeconds(1))
//                .flatMap(sequence -> service.readLogFile().map(line -> "Flux - " + line));
    }


}

