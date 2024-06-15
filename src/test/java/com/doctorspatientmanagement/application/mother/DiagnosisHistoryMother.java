package com.doctorspatientmanagement.application.mother;

import com.doctorspatientmanagement.application.diagnosis.model.DiagnosisHistory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import lombok.Builder;

@Builder
@Component
@Profile("test")
public class DiagnosisHistoryMother {

  public static DiagnosisHistory.DiagnosisHistoryBuilder diagnosisHistory() {
    return DiagnosisHistory
      .builder()
      .anamnesis("Anamnesis")
      .doctorsDiagnosis("Diagnosis")
      .control("Control")
      .referral("Referral")
      .therapy("Therapy");
  }
}
