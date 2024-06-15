package com.doctorspatientmanagement.application.diagnosis.api;

import com.doctorspatientmanagement.application.diagnosis.model.DiagnosisCode;
import com.doctorspatientmanagement.application.shared.validation.OnCreate;
import com.doctorspatientmanagement.application.shared.validation.OnDelete;
import com.doctorspatientmanagement.application.shared.validation.OnUpdate;

import java.time.LocalDateTime;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class DiagnosisHistoryDto {

  @NotNull(groups = {OnUpdate.class, OnDelete.class})
  Long id;

  @NotNull
  Long patientId;

  @NotNull(groups = {OnCreate.class, OnUpdate.class})
  DiagnosisCode diagnosisCode;

  String doctorsDiagnosis;
  String therapy;
  String referral;
  String anamnesis;
  String control;
  LocalDateTime createdAt;
  LocalDateTime updatedAt;
}
