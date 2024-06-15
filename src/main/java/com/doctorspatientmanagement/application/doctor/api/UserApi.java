package com.doctorspatientmanagement.application.doctor.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api")
public interface UserApi {

  @PostMapping("register")
  void register(@RequestBody UserRegisterRequestDto userRegisterRequestDto);

  @PostMapping("/login")
  UserDto login(@RequestBody UserLoginRequestDto userLoginRequestDto);

  @PatchMapping("/confirm-profile/{token}")
  void activateUser(@PathVariable String token);

  @PostMapping("confirm-profile/resend")
  void resendConfirmationToken(@RequestBody UserDto userDto);

  @GetMapping("/logged")
  ResponseEntity<String> logged();
}
