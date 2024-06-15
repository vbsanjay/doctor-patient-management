package com.doctorspatientmanagement.application.doctor.mapper;

import com.doctorspatientmanagement.application.doctor.api.UserDto;
import com.doctorspatientmanagement.application.doctor.api.UserRegisterRequestDto;
import com.doctorspatientmanagement.application.doctor.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class UserMapper {

  private final ModelMapper modelMapper;

  public UserDto mapFrom(User user) {
    return modelMapper.map(user, UserDto.class);
  }

  public User mapFrom(UserRegisterRequestDto userRegisterRequestDto) {
    return modelMapper.map(userRegisterRequestDto, User.class);
  }
}
