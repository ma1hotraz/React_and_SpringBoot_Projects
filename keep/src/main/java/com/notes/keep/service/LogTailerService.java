//package com.notes.keep.service;
//
//import org.apache.commons.io.input.Tailer;
//import org.apache.commons.io.input.TailerListenerAdapter;
//import org.springframework.stereotype.Service;
//import java.io.File;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.concurrent.CountDownLatch;
//import java.util.concurrent.TimeUnit;
//
//@Service
//public class LogTailerService {
//
//    private final String logFilePath = "./logs/myapp.log";
//
//    public List<String> tailLogFile() {
//
//        List<String> newLines = new ArrayList<>();
//        CountDownLatch latch = new CountDownLatch(1);
//
//        try {
//            TailerListenerAdapter listener = new TailerListenerAdapter() {
//                @Override
//                public void handle(String line) {
//                    newLines.add(line);
//                }
//
//                @Override
//                public void endOfFileReached() {
//                    latch.countDown();
//                }
//            };
//
//            File logFile = new File(logFilePath);
//
//
//            if (!logFile.exists() || !logFile.canRead()) {
//                throw new IllegalArgumentException("Log file does not exist or is not readable.");
//            }
//
//            Tailer tailer = new Tailer(logFile, listener, 1000, true);
//            Thread thread = new Thread(tailer);
//            thread.setDaemon(true);
//            thread.start();
//            tailer.stop();
//            latch.await(10, TimeUnit.SECONDS);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return newLines;
//    }
//}
//

package com.notes.keep.service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import static java.nio.file.StandardWatchEventKinds.ENTRY_MODIFY;

@Service
public class LogTailerService {

    private final String logFilePath = "./logs/myapp.log";
    private final List<String> logLines = new ArrayList<>();
    private final Object lock = new Object();

    public LogTailerService() {
        startLogMonitoring();
    }

    private void startLogMonitoring() {
        ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();
        executorService.scheduleAtFixedRate(this::readLogFile, 0, 1, TimeUnit.SECONDS);
    }

    private void readLogFile() {
        try (WatchService watchService = FileSystems.getDefault().newWatchService()) {
            Path logPath = Paths.get(logFilePath).getParent();
            logPath.register(watchService, ENTRY_MODIFY);

            WatchKey key = watchService.poll(100, TimeUnit.MILLISECONDS);
            if (key != null) {
                for (WatchEvent<?> event : key.pollEvents()) {
                    if (event.kind() == ENTRY_MODIFY) {
                        System.out.println("Log file modified. Reading contents...");
                        synchronized (lock) {
                            logLines.clear();
                            logLines.addAll(Files.readAllLines(Paths.get(logFilePath), StandardCharsets.UTF_8));
                        }
                    }
                }
                key.reset();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<String> getLogLines() {
        synchronized (lock) {
            return new ArrayList<>(logLines);
        }
    }
}




