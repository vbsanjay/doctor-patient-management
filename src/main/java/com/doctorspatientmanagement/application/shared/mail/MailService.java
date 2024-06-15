package com.doctorspatientmanagement.application.shared.mail;

public interface MailService {

  void sendSimpleMessage(String from, String to, String subject, String text);
}
