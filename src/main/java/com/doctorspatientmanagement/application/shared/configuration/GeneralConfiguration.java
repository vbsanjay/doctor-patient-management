package com.doctorspatientmanagement.application.shared.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;

@Getter
@Configuration
public class GeneralConfiguration {

  @Value("${general.spa-url}")
  private String spaUrl;

  @Value("${general.no-reply-email}")
  private String noReplyEmail;
}
