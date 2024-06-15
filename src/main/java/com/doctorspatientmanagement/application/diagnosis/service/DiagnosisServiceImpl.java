package com.doctorspatientmanagement.application.diagnosis.service;

import com.doctorspatientmanagement.application.diagnosis.api.DiagnosisHistoryDto;
import com.doctorspatientmanagement.application.diagnosis.model.DiagnosisCode;
import com.doctorspatientmanagement.application.diagnosis.model.DiagnosisCodeRepository;
import com.doctorspatientmanagement.application.diagnosis.model.DiagnosisHistory;
import com.doctorspatientmanagement.application.doctor.model.User;
import com.doctorspatientmanagement.application.doctor.service.UserService;
import com.doctorspatientmanagement.application.patient.model.Patient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class DiagnosisServiceImpl implements DiagnosisService {

  private final DiagnosisCodeRepository diagnosisCodeRepository;
  private final UserService userService;

  @Override
  public List<DiagnosisCode> getDiagnosisCodes() {
    return diagnosisCodeRepository.getAllByOrderByDiseaseAsc();
  }

  @Override
  public void saveDiagnosisHistory(DiagnosisHistory diagnosisHistory, Long patientId) {
    User doctor = userService.getLoggedUser();
    Patient patient = doctor.findPatient(patientId);
    patient.addDiagnosisHistory(diagnosisHistory);
  }

  @Override
  public List<DiagnosisHistory> getDiagnosisHistory(Long patientId) {
    User doctor = userService.getLoggedUser();
    return new ArrayList<>(doctor
      .findPatient(patientId)
      .getDiagnosisHistories());
  }

  @Override
  public void updateDiagnosisHistory(DiagnosisHistoryDto diagnosisHistoryDto) {
    User doctor = userService.getLoggedUser();
    DiagnosisHistory existingDiagnosisHistory = doctor
      .findPatient(diagnosisHistoryDto.getPatientId())
      .findDiagnosisHistory(diagnosisHistoryDto.getId());
    existingDiagnosisHistory.updateFrom(diagnosisHistoryDto);
  }

  @Override
  public void removeDiagnosisHistory(DiagnosisHistoryDto diagnosisHistoryDto) {
    User doctor = userService.getLoggedUser();
    Patient patient = doctor.findPatient(diagnosisHistoryDto.getPatientId());
    DiagnosisHistory diagnosisHistoryForRemoval = patient.findDiagnosisHistory(diagnosisHistoryDto.getId());
    patient.removeDiagnosisHistory(diagnosisHistoryForRemoval);
  }
}
