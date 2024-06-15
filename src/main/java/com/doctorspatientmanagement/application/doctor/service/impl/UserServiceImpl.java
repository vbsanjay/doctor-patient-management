package com.doctorspatientmanagement.application.doctor.service.impl;

import com.doctorspatientmanagement.application.doctor.event.UserEventPublisher;
import com.doctorspatientmanagement.application.doctor.exception.UserNotFoundException;
import com.doctorspatientmanagement.application.doctor.model.RoleOptions;
import com.doctorspatientmanagement.application.doctor.model.User;
import com.doctorspatientmanagement.application.doctor.model.UserDetails;
import com.doctorspatientmanagement.application.doctor.api.UserLoginRequestDto;
import com.doctorspatientmanagement.application.doctor.model.UserRepository;
import com.doctorspatientmanagement.application.doctor.exception.UserIsDuplicateException;
import com.doctorspatientmanagement.application.doctor.service.UserService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import javax.transaction.Transactional;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final UserEventPublisher userEventPublisher;
  private final DaoAuthenticationProvider daoAuthenticationProvider;

  @Override
  public void saveUser(User user) {
    user.addRole(RoleOptions.DOCTOR.name());
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    userRepository.save(user);
    userEventPublisher.publishUserRegisteredEvent(user);
  }

  @Override
  public User login(UserLoginRequestDto userLoginRequestDto) {
    var authenticationToken = new UsernamePasswordAuthenticationToken(userLoginRequestDto.getEmail(),
      userLoginRequestDto.getPassword());
    Authentication authentication = daoAuthenticationProvider.authenticate(authenticationToken);
    SecurityContext context = SecurityContextHolder.createEmptyContext();
    context.setAuthentication(authentication);
    SecurityContextHolder.setContext(context);
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    return userDetails.getUser();
  }

  @Override
  public User getLoggedUser() {
    UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return userRepository.getUserById(userDetails.getUser().getId());
  }

  @Override
  public void checkForDuplicate(String email) {
    Optional<User> searchedUser = userRepository.findByEmail(email);
    searchedUser.ifPresent((userFound) -> {
      throw new UserIsDuplicateException();
    });
  }

  @Override
  public boolean isLogged() {
    Authentication authentication = SecurityContextHolder
      .getContext()
      .getAuthentication();
    return authentication != null &&
      authentication.getPrincipal() instanceof org.springframework.security.core.userdetails.UserDetails;
  }

  @Override
  public void resendConfirmationToken(String email) {
    Optional<User> searchedUser = userRepository.findByEmail(email);
    if (searchedUser.isEmpty()) {
      throw new UserNotFoundException();
    }
    User user = searchedUser.get();
    userEventPublisher.publishResendTokenEvent(user);
  }
}
