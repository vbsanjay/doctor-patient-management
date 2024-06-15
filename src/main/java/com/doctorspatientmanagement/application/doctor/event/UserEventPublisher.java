package com.doctorspatientmanagement.application.doctor.event;

import com.doctorspatientmanagement.application.doctor.model.User;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class UserEventPublisher {

  private final ApplicationEventPublisher publisher;

  public void publishUserRegisteredEvent(final User user) {
    publisher.publishEvent(new UserRegisteredEvent(user));
  }

  public void publishResendTokenEvent(User user) {
    publisher.publishEvent(new ResendTokenEvent(user));
  }
}
