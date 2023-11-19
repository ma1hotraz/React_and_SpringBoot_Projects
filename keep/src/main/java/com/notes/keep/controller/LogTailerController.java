package com.notes.keep.controller;

import com.notes.keep.service.LogTailerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/logs")
public class LogTailerController{

    @Autowired
    private LogTailerService logTailerService;


    @GetMapping("/tail-log")
    public List<String> tailLog(){
        System.out.println(logTailerService.getLogLines());
        return logTailerService.getLogLines();
    }

}

