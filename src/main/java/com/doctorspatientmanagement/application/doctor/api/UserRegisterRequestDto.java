package com.doctorspatientmanagement.application.doctor.api;


import lombok.Data;

@Data
public class UserRegisterRequestDto {

  private String username;

  private String email;

  private String password;
}
