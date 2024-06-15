package com.doctorspatientmanagement.application.image.service;

import com.doctorspatientmanagement.application.doctor.service.UserService;
import com.doctorspatientmanagement.application.image.ImageEditor;
import com.doctorspatientmanagement.application.image.ImageStorage;
import com.doctorspatientmanagement.application.image.api.RemovePatientDto;
import com.doctorspatientmanagement.application.image.exception.ImageNotFoundException;
import com.doctorspatientmanagement.application.image.model.Image;
import com.doctorspatientmanagement.application.patient.model.Patient;
import com.doctorspatientmanagement.application.patient.service.PatientService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class ImageServiceImpl implements ImageService {

  private final PatientService patientService;
  private final ImageStorage imageStorage;
  private final UserService userService;

  @Override
  public void saveImage(MultipartFile imageToBeUploaded, Long patientId) {
    File savedImage = saveImageToStorage(imageToBeUploaded, patientId.toString());
    saveImageToDatabase(savedImage, patientId);
  }

  @Override
  public List<Image> getAllImages(Long patientId) {
    Patient patient = patientService.findPatient(patientId);
    return new ArrayList<>(patient.getImages());
  }

  @Override
  public File findPatientImage(Long patientId, String imageName) {
    Patient patient = userService
      .getLoggedUser()
      .findPatient(patientId);
    Optional<Image> patientImage = patient.findImageBy(imageName);
    if (patientImage.isEmpty()) {
      throw new ImageNotFoundException();
    }
    return imageStorage.getImage(patientId.toString(),
      patientImage
        .get()
        .getFileName());
  }

  @Override
  public void removeImages(RemovePatientDto imageIds) {
    Patient patient = userService.getLoggedUser()
      .findPatient(imageIds.getPatientId());

    Set<Image> imagesForRemoval = patient.getImagesBy(imageIds.getImageIds());

    imagesForRemoval.forEach(image -> {
      imageStorage.removeImage(image);
      patient.removeImage(image);
    });
  }

  private void saveImageToDatabase(File savedImage, Long patientId) {
    Image imageStoredInDatabase = Image
      .builder()
      .fileName(savedImage.getName())
      .build();

    Patient patient = userService
      .getLoggedUser()
      .findPatient(patientId);
    patient.addImage(imageStoredInDatabase);
  }

  private File saveImageToStorage(MultipartFile imageToBeUploaded, String patientFolder) {
    try {
      BufferedImage editedImage = ImageEditor.cropAndPad(imageToBeUploaded);
      return imageStorage.saveImageToFileSystem(editedImage, imageToBeUploaded, patientFolder);
    } catch (IOException exception) {
      throw new UncheckedIOException(exception);
    }
  }
}
