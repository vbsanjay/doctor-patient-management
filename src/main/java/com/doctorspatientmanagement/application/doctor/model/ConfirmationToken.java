package com.doctorspatientmanagement.application.doctor.model;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "confirmation_tokens")
public class ConfirmationToken {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User user;

  private String token;

  private final LocalDateTime expiryDate = calculateExpiryDate();

  public ConfirmationToken() {
    setToken(UUID
      .randomUUID()
      .toString());
  }

  public Boolean isTokenExpired() {
    return LocalDateTime
      .now()
      .isAfter(expiryDate);
  }

  private LocalDateTime calculateExpiryDate() {
    int expirationTimeoutMinutes = 60 * 24; // 1 day
    LocalDateTime now = LocalDateTime.now();
    return now.plusMinutes(expirationTimeoutMinutes);
  }
}
