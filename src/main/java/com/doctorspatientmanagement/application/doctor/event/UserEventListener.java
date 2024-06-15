package com.doctorspatientmanagement.application.doctor.event;

import com.doctorspatientmanagement.application.doctor.model.ConfirmationToken;
import com.doctorspatientmanagement.application.doctor.model.ConfirmationTokenRepository;
import com.doctorspatientmanagement.application.doctor.model.User;
import com.doctorspatientmanagement.application.shared.configuration.GeneralConfiguration;
import com.doctorspatientmanagement.application.shared.mail.MailService;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.Optional;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class UserEventListener {

  private final MailService mailService;
  private final GeneralConfiguration generalConfiguration;
  private final ConfirmationTokenRepository confirmationTokenRepository;

  @Async
  @EventListener
  public void handleUserCreated(UserRegisteredEvent userRegisteredEvent) {
    sendConfirmationToken(userRegisteredEvent.getUser());
  }

  @Async
  @EventListener
  public void handleResendToken(ResendTokenEvent resendTokenEvent) {
    sendConfirmationToken(resendTokenEvent.getUser());
  }

  private void sendConfirmationToken(User user) {
    Optional<ConfirmationToken> userConfirmationToken = confirmationTokenRepository.findByUser(user);
    userConfirmationToken.ifPresent(confirmationTokenRepository::delete);

    ConfirmationToken confirmationToken = new ConfirmationToken();
    confirmationToken.setUser(user);
    confirmationTokenRepository.save(confirmationToken);

    String confirmationLink = generalConfiguration.getSpaUrl() +
      "/user-confirmation/activate/" +
      confirmationToken.getToken();

    mailService.sendSimpleMessage(
      generalConfiguration.getNoReplyEmail(),
      user.getEmail(),
      "Profile Activation Code",
      confirmationLink);
  }
}
