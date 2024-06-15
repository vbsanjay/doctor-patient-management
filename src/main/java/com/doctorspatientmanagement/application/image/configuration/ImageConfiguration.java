package com.doctorspatientmanagement.application.image.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;

@Getter
@Configuration
public class ImageConfiguration {

  @Value("${image.patient.location}")
  private String patientImageLocation;
}
