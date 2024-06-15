package com.doctorspatientmanagement.application.patient.service;

import com.doctorspatientmanagement.application.patient.api.PatientDto;
import com.doctorspatientmanagement.application.patient.model.Patient;

import java.util.Set;

public interface PatientService {

  Patient savePatient(Patient patient);

  Set<Patient> getPatientsFromDoctor();

  Patient findPatient(Long patientId);

  void updatePatient(PatientDto patientDto);

  void deletePatient(Long patientId);
}
