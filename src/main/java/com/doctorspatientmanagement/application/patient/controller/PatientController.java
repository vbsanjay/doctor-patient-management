package com.doctorspatientmanagement.application.patient.controller;

import com.doctorspatientmanagement.application.patient.api.PatientApi;
import com.doctorspatientmanagement.application.patient.api.PatientDto;
import com.doctorspatientmanagement.application.patient.mapper.PatientMapper;
import com.doctorspatientmanagement.application.patient.model.Patient;
import com.doctorspatientmanagement.application.patient.service.PatientService;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class PatientController implements PatientApi {

  private final PatientService patientService;
  private final PatientMapper patientMapper;

  @Override
  public Collection<PatientDto> getAllPatients() {
    Set<Patient> patients = patientService.getPatientsFromDoctor();
    return patients
      .stream()
      .map(patientMapper::mapFrom)
      .collect(Collectors.toList());
  }

  @Override
  public PatientDto getPatient(Long patientId) {
    Patient patient = patientService.findPatient(patientId);
    return patientMapper.mapFrom(patient);
  }

  @Override
  public PatientDto savePatient(PatientDto patientDto) {
    Patient patient = patientService.savePatient(patientMapper.mapFrom(patientDto));
    return patientMapper.mapFrom(patient);
  }

  @Override
  public void updatePatient(PatientDto patientDto) {
    patientService.updatePatient(patientDto);
  }

  @Override
  public void deletePatient(Long patientId) {
    patientService.deletePatient(patientId);
  }
}
