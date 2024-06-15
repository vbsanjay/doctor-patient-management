package com.doctorspatientmanagement.application.image.api;

import lombok.Data;

@Data
public class ImageDto {

  Long id;
  Long patientId;
  String fileName;
  String description;
}
