package com.notes.keep.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;

@Service
public class ScheduledTaskService {

    @Autowired
    private DataSource dataSource;

        @Scheduled(cron = "0 0 5 * * *")
    public void runScheduledTask() {
        System.out.println("CALLED");
        try (Connection connection = dataSource.getConnection();
             Statement statement = connection.createStatement()) {
            String sql = "DELETE FROM TRASH WHERE date < now() - interval 30 day;";
            statement.executeUpdate(sql);
            System.out.println("TRASH TABLE UPDATED SUCCESSFULLY");
        } catch (Exception e) {
            System.out.println("TRASH TABLE UPDATED UNSUCCESSFULLY");
            e.printStackTrace();
        }
    }
}

