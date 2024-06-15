package com.doctorspatientmanagement.application.mother;


import com.doctorspatientmanagement.application.image.model.Image;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import lombok.Builder;

@Builder
@Component
@Profile("test")
public class ImageMother {

  public ImageMother() {

  }

  public Image.ImageBuilder image() {
    return Image.builder();
  }
}
