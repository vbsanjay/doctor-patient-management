package com.doctorspatientmanagement.application.doctor.model;

import com.doctorspatientmanagement.application.doctor.exception.InvalidPatientDoctorRelationException;
import com.doctorspatientmanagement.application.patient.model.Patient;
import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinTable(name = "users_roles",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles = new HashSet<>();

  @JsonBackReference
  @OrderBy("updatedAt DESC")
  @OneToMany(mappedBy = "doctor", orphanRemoval = true, cascade = CascadeType.ALL)
  private Set<Patient> patients = new HashSet<>();

  private String username;
  private String email;
  private String password;
  private Boolean isActive = false;

  @CreationTimestamp
  private LocalDateTime createdAt;

  @UpdateTimestamp
  private LocalDateTime updatedAt;

  public void addRole(String roleOption) {
    Role role = Role.createWith(roleOption);
    getRoles().add(role);
  }

  public void addPatient(Patient patient) {
    getPatients().add(patient);
    patient.setDoctor(this);
  }

  public Optional<Patient> getPatientByUniqueKey(String firstName, String lastName, String phone) {
    return getPatients()
      .stream()
      .filter(patient -> patient
        .getFirstName()
        .equals(firstName) &&
        patient
          .getLastName()
          .equals(lastName) &&
        patient
          .getPhone()
          .equals(phone))
      .findFirst();
  }

  public Patient findPatient(Long patientId) {
    return getPatients()
      .stream()
      .filter(patient -> patient
        .getId()
        .equals(patientId))
      .findFirst().orElseThrow(InvalidPatientDoctorRelationException::new);
  }

  public void removePatient(Patient patient) {
    patient.setDoctor(null);
    getPatients().remove(patient);
  }
}
