package com.doctorspatientmanagement.application.doctor.api;

import com.doctorspatientmanagement.application.doctor.model.Role;

import java.util.Set;

import lombok.Data;

@Data
public class UserDto {

  Set<Role> roles;
  String username;
  String email;
  String createdAt;
  String updatedAt;
}
