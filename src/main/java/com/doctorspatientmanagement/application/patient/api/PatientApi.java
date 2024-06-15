package com.doctorspatientmanagement.application.patient.api;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Collection;

import javax.validation.Valid;

@ResponseBody
@RequestMapping("/api/patient")
public interface PatientApi {

  @GetMapping
  Collection<PatientDto> getAllPatients();

  @GetMapping("/{patientId}")
  PatientDto getPatient(@PathVariable Long patientId);

  @PostMapping
  PatientDto savePatient(@RequestBody @Valid PatientDto patientDto);

  @PatchMapping
  void updatePatient(@RequestBody PatientDto patientDto);

  @DeleteMapping("/{patientId}")
  void deletePatient(@PathVariable Long patientId);
}
