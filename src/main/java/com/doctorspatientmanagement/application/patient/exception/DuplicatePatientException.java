package com.doctorspatientmanagement.application.patient.exception;

import lombok.Getter;

public class DuplicatePatientException extends RuntimeException {

  @Getter
  private final Long patientId;

  public DuplicatePatientException(Long id) {
    this.patientId = id;
  }
}
