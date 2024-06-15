package com.doctorspatientmanagement.application.doctor.controller;

import com.doctorspatientmanagement.application.doctor.api.UserApi;
import com.doctorspatientmanagement.application.doctor.api.UserDto;
import com.doctorspatientmanagement.application.doctor.api.UserLoginRequestDto;
import com.doctorspatientmanagement.application.doctor.api.UserRegisterRequestDto;
import com.doctorspatientmanagement.application.doctor.mapper.UserMapper;
import com.doctorspatientmanagement.application.doctor.model.User;
import com.doctorspatientmanagement.application.doctor.service.ConfirmationService;
import com.doctorspatientmanagement.application.doctor.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class UserController implements UserApi {

  private final ConfirmationService confirmationService;
  private final UserService userService;
  private final UserMapper userMapper;

  @Override
  public void register(UserRegisterRequestDto userRegisterRequestDto) {
    userService.checkForDuplicate(userRegisterRequestDto.getEmail());
    userService.saveUser(userMapper.mapFrom(userRegisterRequestDto));
  }

  @Override
  public UserDto login(UserLoginRequestDto userLoginRequestDto) {
    User user = userService.login(userLoginRequestDto);
    return userMapper.mapFrom(user);
  }

  @Override
  public void activateUser(String token) {
    confirmationService.activateUser(token);
  }

  @Override
  public void resendConfirmationToken(UserDto userDto) {
    userService.resendConfirmationToken(userDto.getEmail());
  }

  @Override
  public ResponseEntity<String> logged() {
    if (userService.isLogged()) {
      return ResponseEntity
        .ok()
        .build();
    }
    return ResponseEntity
      .notFound()
      .build();
  }
}
