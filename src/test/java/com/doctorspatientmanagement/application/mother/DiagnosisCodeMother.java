package com.doctorspatientmanagement.application.mother;

import com.doctorspatientmanagement.application.diagnosis.model.DiagnosisCode;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import lombok.Builder;

@Builder
@Component
@Profile("test")
public class DiagnosisCodeMother {

  public static DiagnosisCode.DiagnosisCodeBuilder diagnosisCode() {
    return DiagnosisCode
      .builder()
      .code("10")
      .disease("Some Disease")
      .fullDiagnosis("10 - Some Disease");
  }
}
