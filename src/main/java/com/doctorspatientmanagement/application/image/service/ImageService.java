package com.doctorspatientmanagement.application.image.service;

import com.doctorspatientmanagement.application.image.api.RemovePatientDto;
import com.doctorspatientmanagement.application.image.model.Image;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

public interface ImageService {

  void saveImage(MultipartFile imageToBeUploaded, Long patientId);

  List<Image> getAllImages(Long patientId);

  File findPatientImage(Long patientId, String imageName);

  void removeImages(RemovePatientDto imageIds);
}
