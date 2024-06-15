package com.doctorspatientmanagement.application.mother;

import com.doctorspatientmanagement.application.doctor.model.User;
import com.doctorspatientmanagement.application.patient.model.Patient;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.HashSet;

import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@Component
@Profile("test")
@NoArgsConstructor
public class PatientMother {

  public Patient.PatientBuilder patient(User doctor) {
    return Patient
      .builder()
      .doctor(doctor)
      .firstName("Hidden")
      .lastName("Eden")
      .fullName("Hidden Eden")
      .email("patient@gmail.com")
      .phone("123123")
      .images(new HashSet<>())
      .diagnosisHistories(new HashSet<>());
  }
}
