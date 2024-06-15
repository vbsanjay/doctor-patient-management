package com.doctorspatientmanagement.application.diagnosis.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PostLoad;
import javax.persistence.Table;
import javax.persistence.Transient;

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
@Table(name = "diagnosis_codes")
public class DiagnosisCode {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String code;

  private String disease;

  @Transient
  private String fullDiagnosis;

  @PostLoad
  public void fullDiagnosis() {
    setFullDiagnosis(getCode() + " - " + getDisease());
  }
}
