package com.doctorspatientmanagement.application.shared;

import com.doctorspatientmanagement.application.doctor.exception.ConfirmationTokenExpiredException;
import com.doctorspatientmanagement.application.doctor.exception.ConfirmationTokenIncorrectException;
import com.doctorspatientmanagement.application.doctor.exception.InvalidPatientDoctorRelationException;
import com.doctorspatientmanagement.application.doctor.exception.UserIsDuplicateException;
import com.doctorspatientmanagement.application.doctor.exception.UserNotFoundException;
import com.doctorspatientmanagement.application.patient.api.PatientDto;
import com.doctorspatientmanagement.application.patient.exception.DiagnosisHistoryMissingInPatientException;
import com.doctorspatientmanagement.application.patient.exception.DuplicatePatientException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.validation.ConstraintViolationException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(UserIsDuplicateException.class)
  @ResponseStatus(HttpStatus.CONFLICT)
  @ResponseBody
  public void handleUserIsDuplicate(UserIsDuplicateException exception) {
    log.warn("User is already registered.", exception);
  }

  @ExceptionHandler(DisabledException.class)
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  @ResponseBody
  public void handleUserIsDisabled(DisabledException exception) {
    log.warn("User is not activated.", exception);
  }

  @ExceptionHandler(ConfirmationTokenExpiredException.class)
  @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
  public void handleConfirmationTokenExpired(ConfirmationTokenExpiredException exception) {
    log.warn("Token was expired.", exception);
  }

  @ExceptionHandler(ConfirmationTokenIncorrectException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public void handleConfirmationTokenIncorrect(ConfirmationTokenIncorrectException exception) {
    log.warn("Invalid token was sent.", exception);
  }

  @ExceptionHandler(UserNotFoundException.class)
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  public void handleUserNotFound(UserNotFoundException exception) {
    log.warn("User with given email doesn't exists.", exception);
  }

  @ExceptionHandler(DuplicatePatientException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ResponseBody
  public ResponseEntity<PatientDto> handleDuplicatePatient(DuplicatePatientException exception) {
    PatientDto patientDto = new PatientDto();
    patientDto.setId(exception.getPatientId());
    return ResponseEntity
      .badRequest()
      .body(patientDto);
  }

  @ExceptionHandler(InvalidPatientDoctorRelationException.class)
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  public void handleInvalidPatientDoctorException(InvalidPatientDoctorRelationException exception) {
    log.warn("Doctor tried to open/modify a patient that belongs to another doctor.", exception);
  }

  @ExceptionHandler(DiagnosisHistoryMissingInPatientException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public void handleDiagnosisHistoryMissingInPatientException(DiagnosisHistoryMissingInPatientException exception) {
    log.warn("The searched diagnosis history doesnt exists in the patient.", exception);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public void handleConstraintViolationException(ConstraintViolationException exception) {
    log.warn("Violation errors found.", exception);
  }
}
