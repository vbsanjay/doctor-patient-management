package com.doctorspatientmanagement.application.image;

import com.doctorspatientmanagement.application.image.model.Image;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public interface ImageStorage {
  File saveImageToFileSystem(BufferedImage image, MultipartFile file, String patientFolder) throws IOException;

  File getImage(String folderName, String fileName);

  void removeImage(Image image);
}
