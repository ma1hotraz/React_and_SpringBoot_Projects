package com.notes.keep.service.impl;

import com.notes.keep.dto.EmailDTO;
import com.notes.keep.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${mail-server-username}")
    public String email;


    @Override
    public void sendEmail(EmailDTO em) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(email);
        helper.setPriority(10);
        helper.setTo(em.getTo());
        helper.setSubject(em.getSubject());
        helper.setText(em.getMessage());
        mailSender.send(message);

    }
}
