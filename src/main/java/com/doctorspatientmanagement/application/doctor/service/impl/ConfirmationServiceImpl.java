package com.doctorspatientmanagement.application.doctor.service.impl;

import com.doctorspatientmanagement.application.doctor.exception.ConfirmationTokenExpiredException;
import com.doctorspatientmanagement.application.doctor.exception.ConfirmationTokenIncorrectException;
import com.doctorspatientmanagement.application.doctor.model.ConfirmationToken;
import com.doctorspatientmanagement.application.doctor.model.ConfirmationTokenRepository;
import com.doctorspatientmanagement.application.doctor.model.User;
import com.doctorspatientmanagement.application.doctor.service.ConfirmationService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class ConfirmationServiceImpl implements ConfirmationService {

  private final ConfirmationTokenRepository confirmationTokenRepository;

  @Override
  public void activateUser(String token) {
    ConfirmationToken foundToken = confirmationTokenRepository
      .findByToken(token)
      .orElseThrow(ConfirmationTokenIncorrectException::new);

    if (foundToken.isTokenExpired()) {
      throw new ConfirmationTokenExpiredException();
    }

    User user = foundToken.getUser();
    user.setIsActive(true);
  }
}
