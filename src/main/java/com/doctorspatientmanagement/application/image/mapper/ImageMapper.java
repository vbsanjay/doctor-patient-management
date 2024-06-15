package com.doctorspatientmanagement.application.image.mapper;

import com.doctorspatientmanagement.application.image.api.ImageDto;
import com.doctorspatientmanagement.application.image.model.Image;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ImageMapper {

  private final ModelMapper modelMapper;

  public ImageMapper(ModelMapper modelMapper) {
    this.modelMapper = modelMapper;

    modelMapper
      .typeMap(Image.class, ImageDto.class)
      .addMapping(source -> source
        .getPatient()
        .getId(), ImageDto::setPatientId);
  }

  public List<ImageDto> mapFrom(List<Image> images) {
    return images
      .stream()
      .map(image -> modelMapper.map(image, ImageDto.class))
      .collect(Collectors.toList());
  }
}
