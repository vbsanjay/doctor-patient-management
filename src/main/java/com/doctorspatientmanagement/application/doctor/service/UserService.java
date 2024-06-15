package com.doctorspatientmanagement.application.doctor.service;

import com.doctorspatientmanagement.application.doctor.api.UserLoginRequestDto;
import com.doctorspatientmanagement.application.doctor.model.User;

public interface UserService {

  void saveUser(User user);

  User login(UserLoginRequestDto userLoginRequestDto);

  User getLoggedUser();

  void checkForDuplicate(String email);

  boolean isLogged();

  void resendConfirmationToken(String email);
}
