package com.doctorspatientmanagement.application.image;

import org.imgscalr.Scalr;
import org.springframework.web.multipart.MultipartFile;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;

import javax.imageio.ImageIO;

public class ImageEditor {

  private static final Dimension optimalImageDimension = new Dimension(640, 360);

  public static BufferedImage cropAndPad(MultipartFile imageToBeUploaded) throws IOException {
    BufferedImage bufferedImage = ImageIO.read(imageToBeUploaded.getInputStream());
    BufferedImage resizedImage = Scalr.resize(bufferedImage,
      Scalr.Mode.FIT_TO_WIDTH,
      optimalImageDimension.width,
      optimalImageDimension.height);

    BufferedImage paddedImage = new BufferedImage(optimalImageDimension.width,
      optimalImageDimension.height,
      resizedImage.getType());
    Graphics graphics = paddedImage.getGraphics();
    graphics.setColor(Color.BLACK);
    graphics.fillRect(0, 0, optimalImageDimension.width, optimalImageDimension.height);
    graphics.drawImage(
      resizedImage,
      centerImageWidth(resizedImage.getWidth()),
      centerImageHeight(resizedImage.getHeight()),
      null);
    graphics.dispose();

    return paddedImage;
  }

  private static int centerImageHeight(int imageHeight) {
    return (optimalImageDimension.height / 2) - (imageHeight / 2);
  }

  private static int centerImageWidth(int imageWidth) {
    return (optimalImageDimension.width / 2) - (imageWidth / 2);
  }
}
