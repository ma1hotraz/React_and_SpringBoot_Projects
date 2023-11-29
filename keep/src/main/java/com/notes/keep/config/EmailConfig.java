package com.notes.keep.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class EmailConfig {

    @Value("${mail-server-host}")
    public String host;

    @Value("${mail-server-port}")
    public Integer port;

    @Value("${mail-server-username}")
    public String username;

    @Value("${mail-server-password}")
    public String password;
    @Bean
    public JavaMailSender javaMailSender() {

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setHost(host); // Set your mail server host
        mailSender.setPort(port); // Set your mail server port
        mailSender.setUsername(username); // Set your email username
        mailSender.setPassword(password); // Set your email password

        // Additional properties (you may need to adjust these based on your mail server)
        Properties properties = mailSender.getJavaMailProperties();
        properties.put("mail.transport.protocol", "smtp");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");

        return mailSender;
    }
}

