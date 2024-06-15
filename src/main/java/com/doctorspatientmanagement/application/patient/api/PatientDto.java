package com.doctorspatientmanagement.application.patient.api;

import java.time.LocalDateTime;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class PatientDto {

  private Long id;

  @NotNull
  private String firstName;

  @NotNull
  private String lastName;

  @NotNull
  private String phone;

  @Size(max = 255)
  private String fullName;

  @Email
  private String email;
  private String note;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}
