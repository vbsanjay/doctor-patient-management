package com.doctorspatientmanagement.application.diagnosis.mapper;

import com.doctorspatientmanagement.application.diagnosis.api.DiagnosisHistoryDto;
import com.doctorspatientmanagement.application.diagnosis.model.DiagnosisHistory;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class DiagnosisMapper {

  private final ModelMapper modelMapper;

  public DiagnosisHistory mapFrom(DiagnosisHistoryDto diagnosisHistoryDto) {
    return modelMapper.map(diagnosisHistoryDto, DiagnosisHistory.class);
  }

  public List<DiagnosisHistoryDto> mapFrom(List<DiagnosisHistory> diagnosisHistories) {
    return diagnosisHistories
      .stream()
      .map(diagnosisHistory -> modelMapper.map(diagnosisHistory, DiagnosisHistoryDto.class))
      .collect(Collectors.toList());
  }
}
