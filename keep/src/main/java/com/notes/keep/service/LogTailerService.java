package com.notes.keep.service;


import org.apache.commons.io.input.Tailer;
import org.apache.commons.io.input.TailerListenerAdapter;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;

@Service
public class LogTailerService {

    private final String logFilePath = "/logs/myapp.log";

    public List<String> tailLogFile() {

        List<String> newLines = new ArrayList<>();
        CountDownLatch latch = new CountDownLatch(1);

        try {
            TailerListenerAdapter listener = new TailerListenerAdapter() {
                @Override
                public void handle(String line) {
                    newLines.add(line);
                }

                @Override
                public void endOfFileReached() {
                    latch.countDown();
                }
            };

            File logFile = new File(logFilePath);

            if (!logFile.exists() || !logFile.canRead()) {
                throw new IllegalArgumentException("Log file does not exist or is not readable.");
            }

            Tailer tailer = new Tailer(logFile, listener, 100, true);
            Thread thread = new Thread(() -> {
                tailer.run();
            });
            thread.setDaemon(true);
            thread.start();

            // Wait until the tailing is done
            latch.await();

            // Stop the tailer
            tailer.stop();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return newLines;
    }
}




//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Service;
//
//import java.io.IOException;
//import java.nio.file.Paths;
//import java.nio.file.Path;
//import java.nio.file.Files;
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class LogTailerService {
//
//    private final String logFilePath = "/logs/myapp.log";
//    private static long lastReadPosition = 0;
//    @Scheduled(fixedRate = 5000)
//    public String tailLogFile() {
//
//        List<String> newLines = new ArrayList<>();
//        try {
//            Path logFile = Paths.get(logFilePath);
//           newLines  = Files.lines(logFile)
//                    .skip(lastReadPosition)
//                    .toList();
//
//            if (!newLines.isEmpty()) {
//                newLines.forEach(System.out::println);
//                lastReadPosition = Files.size(logFile);
//                System.out.println(lastReadPosition);
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return newLines.toString();
//    }
//}
