package com.doctorspatientmanagement.application.mother;


import com.doctorspatientmanagement.application.doctor.model.User;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.HashSet;

import lombok.Builder;
import lombok.NoArgsConstructor;

;


@Builder
@Component
@Profile("test")
@NoArgsConstructor
public class UserMother {

  public User.UserBuilder user() {
    return User
      .builder()
      .username("username")
      .email("random@email")
      .password("123")
      .isActive(true)
      .patients(new HashSet<>());
  }
}
