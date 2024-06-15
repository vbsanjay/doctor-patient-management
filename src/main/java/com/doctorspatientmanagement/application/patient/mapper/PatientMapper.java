package com.doctorspatientmanagement.application.patient.mapper;

import com.doctorspatientmanagement.application.patient.api.PatientDto;
import com.doctorspatientmanagement.application.patient.model.Patient;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class PatientMapper {

  private final ModelMapper modelMapper;

  public PatientDto mapFrom(Patient patient) {
    return modelMapper.map(patient, PatientDto.class);
  }

  public Patient mapFrom(PatientDto patientDto) {
    return modelMapper.map(patientDto, Patient.class);
  }
}
