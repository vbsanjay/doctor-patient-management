package com.doctorspatientmanagement.application.image;

import com.doctorspatientmanagement.application.image.configuration.ImageConfiguration;
import com.doctorspatientmanagement.application.image.exception.ImageContentTypeUnknownException;
import com.doctorspatientmanagement.application.image.exception.ImageRemovalFailedException;
import com.doctorspatientmanagement.application.image.model.Image;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;

import javax.imageio.ImageIO;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class ImageStorageImpl implements ImageStorage {

  private final ImageConfiguration imageConfiguration;

  @Override
  public File saveImageToFileSystem(BufferedImage image, MultipartFile file, String patientFolder) throws IOException {
    String imageUniqueFileName = timestampFileName(file.getOriginalFilename());
    String imageCompletePath = resolveImagePath(patientFolder, imageUniqueFileName);
    String imageTypeIdentifier = getTypeIdentifier(file.getContentType());

    return saveImage(imageCompletePath, image, imageTypeIdentifier);
  }

  private String getTypeIdentifier(String contentType) {
    if (contentType == null) {
      throw new ImageContentTypeUnknownException();
    }
    String[] splitContentType = contentType.split("/");
    return splitContentType[splitContentType.length - 1];
  }

  @Override
  public File getImage(String folderName, String fileName) {
    String completeImagePath = resolveImagePath(folderName, fileName);
    return new File(completeImagePath);
  }

  @Override
  public void removeImage(Image image) {
    String imageLocation = resolveImagePath(image
      .getPatient()
      .getId()
      .toString(), image.getFileName());
    File fileImage = new File(imageLocation);
    boolean result = fileImage.delete();
    if (!result) {
      throw new ImageRemovalFailedException();
    }
    removeImageDirectory(fileImage.getParentFile());
  }

  private void removeImageDirectory(File parentFileDirectory) {
    if (isDirectory(parentFileDirectory)) {
      parentFileDirectory.delete();
    }
  }

  private boolean isDirectory(File parentFileDirectory) {
    return parentFileDirectory.list() != null;
  }

  private File saveImage(String imageCompletePath, BufferedImage imageToBeUploaded, String imageTypeIdentifier)
    throws IOException {

    File fileForStoring = new File(imageCompletePath);
    fileForStoring
      .getParentFile()
      .mkdirs();
    ImageIO.write(imageToBeUploaded, imageTypeIdentifier, fileForStoring);
    return fileForStoring;
  }

  private String resolveImagePath(String patientFolder, String imageUniqueFileName) {
    String projectRootDirectory = System.getProperty("user.dir");
    String imagesRootDirectory = imageConfiguration.getPatientImageLocation();
    return projectRootDirectory + "/" + imagesRootDirectory + "/" + patientFolder + "/" + imageUniqueFileName;
  }

  private String timestampFileName(String fileName) {
    return LocalDateTime
      .now()
      .getNano() + "-" + fileName;
  }
}
