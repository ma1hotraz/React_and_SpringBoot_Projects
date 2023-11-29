package com.notes.keep.service;

import com.notes.keep.dto.EmailDTO;
import jakarta.mail.MessagingException;

public interface EmailService {
    public void sendEmail(EmailDTO em) throws MessagingException;
}
