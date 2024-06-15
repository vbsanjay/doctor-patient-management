package com.doctorspatientmanagement.application.diagnosis.controller;

import com.doctorspatientmanagement.application.diagnosis.api.DiagnosisApi;
import com.doctorspatientmanagement.application.diagnosis.api.DiagnosisHistoryDto;
import com.doctorspatientmanagement.application.diagnosis.mapper.DiagnosisMapper;
import com.doctorspatientmanagement.application.diagnosis.model.DiagnosisCode;
import com.doctorspatientmanagement.application.diagnosis.service.DiagnosisService;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class DiagnosisController implements DiagnosisApi {

  private final DiagnosisService diagnosisService;
  private final DiagnosisMapper diagnosisMapper;

  @Override
  public List<DiagnosisCode> getDiagnosisCodes() {
    return diagnosisService.getDiagnosisCodes();
  }

  @Override
  public List<DiagnosisHistoryDto> getDiagnosisHistory(Long patientId) {
    return diagnosisMapper.mapFrom(diagnosisService.getDiagnosisHistory(patientId));
  }

  @Override
  public void saveDiagnosisHistory(DiagnosisHistoryDto diagnosisHistoryDto) {
    diagnosisService.saveDiagnosisHistory(
      diagnosisMapper.mapFrom(diagnosisHistoryDto),
      diagnosisHistoryDto.getPatientId()
    );
  }

  @Override
  public void updateDiagnosisHistory(DiagnosisHistoryDto diagnosisHistoryDto) {
    diagnosisService.updateDiagnosisHistory(diagnosisHistoryDto);
  }

  @Override
  public void deleteDiagnosisHistory(DiagnosisHistoryDto diagnosisHistoryDto) {
    diagnosisService.removeDiagnosisHistory(diagnosisHistoryDto);
  }
}
