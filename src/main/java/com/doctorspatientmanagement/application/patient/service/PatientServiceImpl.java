package com.doctorspatientmanagement.application.patient.service;

import com.doctorspatientmanagement.application.doctor.model.User;
import com.doctorspatientmanagement.application.doctor.service.UserService;
import com.doctorspatientmanagement.application.patient.api.PatientDto;
import com.doctorspatientmanagement.application.patient.exception.DuplicatePatientException;
import com.doctorspatientmanagement.application.patient.model.Patient;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class PatientServiceImpl implements PatientService {

  private final UserService userService;

  @Override
  public Patient savePatient(Patient patient) {
    User doctor = userService.getLoggedUser();
    Optional<Patient> existingPatient = doctor.getPatientByUniqueKey(
      patient.getFirstName(),
      patient.getLastName(),
      patient.getPhone()
    );
    if (existingPatient.isPresent()) {
      throw new DuplicatePatientException(existingPatient.get().getId());
    }

    doctor.addPatient(patient);
    return patient;
  }

  @Override
  public Set<Patient> getPatientsFromDoctor() {
    User doctor = userService.getLoggedUser();
    return doctor.getPatients();
  }

  @Override
  public Patient findPatient(Long patientId) {
    User doctor = userService.getLoggedUser();
    return doctor.findPatient(patientId);
  }

  @Override
  public void updatePatient(PatientDto patientDto) {
    User doctor = userService.getLoggedUser();
    Patient patient = doctor.findPatient(patientDto.getId());
    patient.updateFrom(patientDto);
  }

  @Override
  public void deletePatient(Long patientId) {
    User doctor = userService.getLoggedUser();
    doctor.removePatient(doctor.findPatient(patientId));
  }
}
