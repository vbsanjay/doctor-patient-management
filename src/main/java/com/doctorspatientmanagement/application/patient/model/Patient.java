package com.doctorspatientmanagement.application.patient.model;

import com.doctorspatientmanagement.application.diagnosis.model.DiagnosisHistory;
import com.doctorspatientmanagement.application.doctor.model.User;
import com.doctorspatientmanagement.application.image.model.Image;
import com.doctorspatientmanagement.application.patient.api.PatientDto;
import com.doctorspatientmanagement.application.patient.exception.DiagnosisHistoryMissingInPatientException;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.PostLoad;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "patients")
public class Patient {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @ManyToOne
  @JsonManagedReference
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User doctor;

  @OrderBy("updatedAt DESC")
  @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<DiagnosisHistory> diagnosisHistories = new HashSet<>();

  @OrderBy("updatedAt DESC")
  @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<Image> images = new HashSet<>();

  private String firstName;
  private String lastName;

  @Transient
  private String fullName;

  private String phone;
  private String email;
  private String note;


  @CreationTimestamp
  private LocalDateTime createdAt;

  @UpdateTimestamp
  private LocalDateTime updatedAt;

  @PostLoad
  public void fullName() {
    setFullName(getFirstName() + " " + getLastName());
  }

  public void updateFrom(PatientDto patientDto) {
    setFirstName(patientDto.getFirstName());
    setLastName(patientDto.getLastName());
    setPhone(patientDto.getPhone());
    setEmail(patientDto.getEmail());
    setNote(patientDto.getNote());
  }

  public void addDiagnosisHistory(DiagnosisHistory diagnosisHistory) {
    getDiagnosisHistories().add(diagnosisHistory);
    diagnosisHistory.setPatient(this);
  }

  public DiagnosisHistory findDiagnosisHistory(Long id) {
    return getDiagnosisHistories()
      .stream()
      .filter(diagnosisHistory -> diagnosisHistory
        .getId()
        .equals(id))
      .findFirst()
      .orElseThrow(DiagnosisHistoryMissingInPatientException::new);
  }

  public void removeDiagnosisHistory(DiagnosisHistory diagnosisHistory) {
    diagnosisHistory.setPatient(null);
    getDiagnosisHistories().remove(diagnosisHistory);
  }

  public void addImage(Image image) {
    image.setPatient(this);
    getImages().add(image);
  }

  public Optional<Image> findImageBy(String name) {
    return getImages()
      .stream()
      .filter(image -> image
        .getFileName()
        .equals(name))
      .findFirst();
  }

  public Set<Image> getImagesBy(List<Long> providedImageIds) {
    return getImages()
      .stream()
      .filter(image -> providedImageIds
        .stream()
        .anyMatch(providedImageId -> image
          .getId()
          .equals(providedImageId)))
      .collect(Collectors.toSet());
  }

  public void removeImage(Image image) {
    image.setPatient(null);
    getImages().remove(image);
  }
}
