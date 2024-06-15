package com.doctorspatientmanagement.application.diagnosisHistory;

import com.doctorspatientmanagement.application.diagnosis.model.DiagnosisCode;
import com.doctorspatientmanagement.application.diagnosis.model.DiagnosisCodeRepository;
import com.doctorspatientmanagement.application.diagnosis.model.DiagnosisHistory;
import com.doctorspatientmanagement.application.diagnosis.model.DiagnosisHistoryRepository;
import com.doctorspatientmanagement.application.doctor.model.User;
import com.doctorspatientmanagement.application.doctor.model.UserRepository;
import com.doctorspatientmanagement.application.mother.DiagnosisCodeMother;
import com.doctorspatientmanagement.application.mother.DiagnosisHistoryMother;
import com.doctorspatientmanagement.application.mother.PatientMother;
import com.doctorspatientmanagement.application.mother.UserMother;
import com.doctorspatientmanagement.application.patient.model.Patient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
@Import({UserMother.class, PatientMother.class})
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class DiagnosisHistoryTest {

  @Autowired
  private DiagnosisHistoryRepository diagnosisHistoryRepository;

  @Autowired
  private DiagnosisCodeRepository diagnosisCodeRepository;

  @Autowired
  private TestEntityManager entityManager;

  @Autowired
  private UserMother userMother;

  @Autowired
  private PatientMother patientMother;

  @Autowired
  private UserRepository userRepository;

  @Test
  void itWillFailIfDiagnosisHistoryIsMissingDoctorsDiagnosis() {
    DiagnosisCode diagnosisCode = DiagnosisCodeMother
      .diagnosisCode()
      .build();
    diagnosisCodeRepository.save(diagnosisCode);
    entityManager.flush();

    User doctor = userMother
      .user()
      .build();
    userRepository.save(doctor);
    entityManager.flush();

    Patient patient = patientMother
      .patient(doctor)
      .build();
    doctor.addPatient(patient);
    userRepository.save(doctor);
    entityManager.flush();

    DiagnosisHistory diagnosisHistory = DiagnosisHistoryMother
      .diagnosisHistory()
      .patient(doctor
        .getPatients()
        .stream()
        .findFirst()
        .get())
      .diagnosisCode(diagnosisCode)
      .doctorsDiagnosis("RANDOM")
      .build();

    diagnosisHistoryRepository.save(diagnosisHistory);
  }

  @Test
  void itCreatesAssociationWithPatientAndDiagnosisHistory() {
    DiagnosisCode diagnosisCode = DiagnosisCodeMother
      .diagnosisCode()
      .build();
    diagnosisCodeRepository.save(diagnosisCode);
    entityManager.flush();

    User doctor = userMother
      .user()
      .build();
    userRepository.save(doctor);
    entityManager.flush();

    Patient patient = entityManager.persist(patientMother
      .patient(doctor)
      .build());
    doctor.addPatient(patient);
    entityManager.flush();

    DiagnosisHistory diagnosisHistory = entityManager.persistFlushFind(DiagnosisHistoryMother
      .diagnosisHistory()
      .patient(doctor
        .getPatients()
        .stream()
        .findFirst()
        .get())
      .diagnosisCode(diagnosisCode)
      .build());
    patient.addDiagnosisHistory(diagnosisHistory);
    entityManager.flush();

    assertThat(diagnosisHistory.getTherapy()).isEqualTo("Therapy");
    assertThat(diagnosisHistory.getPatient()).isEqualTo(patient);
    assertThat(patient.getDiagnosisHistories().stream().findFirst().get()).isEqualTo(diagnosisHistory);
  }
}












