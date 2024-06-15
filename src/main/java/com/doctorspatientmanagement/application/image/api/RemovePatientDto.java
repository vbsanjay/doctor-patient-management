package com.doctorspatientmanagement.application.image.api;
import java.util.List;
import lombok.Data;

@Data
public class RemovePatientDto {

  List<Long> imageIds;
  Long patientId;
}
