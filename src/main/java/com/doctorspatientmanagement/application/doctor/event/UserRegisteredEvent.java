package com.doctorspatientmanagement.application.doctor.event;

import com.doctorspatientmanagement.application.doctor.model.User;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserRegisteredEvent {
  private final User user;
}
