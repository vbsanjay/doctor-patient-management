package com.doctorspatientmanagement.application.diagnosis.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiagnosisHistoryRepository extends JpaRepository<DiagnosisHistory, Long> {
  DiagnosisHistory findDiagnosisHistoryById(Long id);
}
