package com.notes.keep.service;

import com.notes.keep.utils.Loggers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;

@Service
public class ScheduledTaskService {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private Environment environment;

        @Scheduled(cron = "0 0 5 * * *")
    public void runScheduledTask() {
            if(!environment.matchesProfiles("default")){
                try (Connection connection = dataSource.getConnection();
                     Statement statement = connection.createStatement()) {
                    String sql = "DELETE FROM TRASH WHERE date < now() - interval 30 day;";
                    statement.executeUpdate(sql);
                    Loggers.info("TRASH TABLE UPDATED SUCCESSFULLY");
                } catch (Exception e) {
                    Loggers.info("TRASH TABLE UPDATED UNSUCCESSFULLY");
                    Loggers.error(e.getMessage());
                }
            }
    }
}

