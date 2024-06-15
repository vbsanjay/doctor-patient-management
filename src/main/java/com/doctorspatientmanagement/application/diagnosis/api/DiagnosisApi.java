package com.doctorspatientmanagement.application.diagnosis.api;

import com.doctorspatientmanagement.application.diagnosis.model.DiagnosisCode;
import com.doctorspatientmanagement.application.shared.validation.OnCreate;
import com.doctorspatientmanagement.application.shared.validation.OnDelete;
import com.doctorspatientmanagement.application.shared.validation.OnUpdate;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

import javax.validation.Valid;

@Validated
@ResponseBody
@RequestMapping("/api/diagnosis")
public interface DiagnosisApi {

  @GetMapping("/code")
  List<DiagnosisCode> getDiagnosisCodes();

  @GetMapping("/history")
  List<DiagnosisHistoryDto> getDiagnosisHistory(@RequestParam Long patientId);

  @Validated(OnCreate.class)
  @PostMapping(value = "/history")
  void saveDiagnosisHistory(@RequestBody @Valid DiagnosisHistoryDto diagnosisHistoryDto);

  @Validated(OnUpdate.class)
  @PatchMapping("/history")
  void updateDiagnosisHistory(@RequestBody @Valid DiagnosisHistoryDto diagnosisHistoryDto);

  @Validated(OnDelete.class)
  @DeleteMapping("/history")
  void deleteDiagnosisHistory(@RequestBody @Valid DiagnosisHistoryDto diagnosisHistoryDto);
}
