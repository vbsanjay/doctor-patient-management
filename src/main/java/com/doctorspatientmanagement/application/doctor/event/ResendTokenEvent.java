package com.doctorspatientmanagement.application.doctor.event;

import com.doctorspatientmanagement.application.doctor.model.User;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResendTokenEvent {
  public final User user;
}
