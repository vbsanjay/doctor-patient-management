package com.doctorspatientmanagement.application.diagnosis.service;

import com.doctorspatientmanagement.application.diagnosis.api.DiagnosisHistoryDto;
import com.doctorspatientmanagement.application.diagnosis.model.DiagnosisCode;
import com.doctorspatientmanagement.application.diagnosis.model.DiagnosisHistory;

import java.util.List;

public interface DiagnosisService {

  List<DiagnosisCode> getDiagnosisCodes();

  void saveDiagnosisHistory(DiagnosisHistory d, Long patientId);

  List<DiagnosisHistory> getDiagnosisHistory(Long patientId);

  void updateDiagnosisHistory(DiagnosisHistoryDto diagnosisHistoryDto);

  void removeDiagnosisHistory(DiagnosisHistoryDto diagnosisHistoryDto);
}
