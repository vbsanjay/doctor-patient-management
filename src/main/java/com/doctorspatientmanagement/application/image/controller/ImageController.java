package com.doctorspatientmanagement.application.image.controller;


import com.doctorspatientmanagement.application.image.api.ImageApi;
import com.doctorspatientmanagement.application.image.api.ImageDto;
import com.doctorspatientmanagement.application.image.api.RemovePatientDto;
import com.doctorspatientmanagement.application.image.mapper.ImageMapper;
import com.doctorspatientmanagement.application.image.service.ImageService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

import javax.activation.FileTypeMap;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class ImageController implements ImageApi {

  private final ImageMapper imageMapper;
  private final ImageService imageService;

  @Override
  public List<ImageDto> getImagesForPatient(Long patientId) {
    return imageMapper.mapFrom(imageService.getAllImages(patientId));
  }

  @Override
  public ResponseEntity<byte[]> getPatientImage(Long patientId, String imageName) throws IOException {
    File requestedImage = imageService.findPatientImage(patientId, imageName);
    return ResponseEntity
      .ok()
      .header("Content-Disposition", "attachment; filename=" + requestedImage.getName())
      .contentType(MediaType.valueOf(FileTypeMap
        .getDefaultFileTypeMap()
        .getContentType(requestedImage)))
      .body(Files.readAllBytes(requestedImage.toPath()));
  }

  @Override
  public void storeImage(MultipartFile imageToBeUploaded, Long patientId) {
    imageService.saveImage(imageToBeUploaded, patientId);
  }

  @Override
  public void removePatientImage(RemovePatientDto imageIds) {
    imageService.removeImages(imageIds);
  }
}
