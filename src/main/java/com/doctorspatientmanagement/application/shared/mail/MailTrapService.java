package com.doctorspatientmanagement.application.shared.mail;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MailTrapService implements MailService {

  private final JavaMailSender javaMailSender;

  @Override
  public void sendSimpleMessage(String from, String to, String subject, String text) {
    SimpleMailMessage simpleMail = new SimpleMailMessage();

    simpleMail.setFrom(from);
    simpleMail.setTo(to);
    simpleMail.setSubject(subject);
    simpleMail.setText(text);

    javaMailSender.send(simpleMail);
  }
}
