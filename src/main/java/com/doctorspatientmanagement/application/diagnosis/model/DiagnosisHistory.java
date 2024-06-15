package com.doctorspatientmanagement.application.diagnosis.model;


import com.doctorspatientmanagement.application.diagnosis.api.DiagnosisHistoryDto;
import com.doctorspatientmanagement.application.patient.model.Patient;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "diagnosis_histories")
public class DiagnosisHistory {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "diagnosis_code_id", referencedColumnName = "id")
  private DiagnosisCode diagnosisCode;

  @ManyToOne
  @JoinColumn(name = "patient_id", referencedColumnName = "id")
  private Patient patient;

  private String doctorsDiagnosis;
  private String therapy;
  private String control;
  private String referral;
  private String anamnesis;

  @CreationTimestamp
  private LocalDateTime createdAt;

  @UpdateTimestamp
  private LocalDateTime updatedAt;

  public void updateFrom(DiagnosisHistoryDto diagnosisHistoryDto) {
    setDiagnosisCode(diagnosisHistoryDto.getDiagnosisCode());
    setDoctorsDiagnosis(diagnosisHistoryDto.getDoctorsDiagnosis());
    setTherapy(diagnosisHistoryDto.getTherapy());
    setControl(diagnosisHistoryDto.getControl());
    setReferral(diagnosisHistoryDto.getReferral());
    setAnamnesis(diagnosisHistoryDto.getAnamnesis());
  }
}
