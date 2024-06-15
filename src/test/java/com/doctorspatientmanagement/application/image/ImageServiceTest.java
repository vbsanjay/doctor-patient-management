package com.doctorspatientmanagement.application.image;


import com.doctorspatientmanagement.application.doctor.model.User;
import com.doctorspatientmanagement.application.doctor.service.UserService;
import com.doctorspatientmanagement.application.image.service.ImageServiceImpl;
import com.doctorspatientmanagement.application.mother.ImageMother;
import com.doctorspatientmanagement.application.mother.PatientMother;
import com.doctorspatientmanagement.application.mother.UserMother;
import com.doctorspatientmanagement.application.patient.model.Patient;
import com.doctorspatientmanagement.application.patient.service.PatientServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ImageServiceTest {

  @Mock
  private UserService userService;

  @Mock
  private ImageStorage imageStorage;

  @Test
  void itGetsAllImages() {
    PatientServiceImpl patientService = new PatientServiceImpl(userService);
    ImageServiceImpl imageService = new ImageServiceImpl(patientService, imageStorage, userService);
    UserMother userMother = new UserMother();
    PatientMother patientMother = new PatientMother();
    ImageMother imageMother = new ImageMother();

    User doctorStub = userMother.user().build();
    Patient patientStub = patientMother.patient(doctorStub).id(0L).build();
    patientStub.addImage(imageMother.image().fileName("something").build());
    patientStub.addImage(imageMother.image().fileName("else").build());
    doctorStub.addPatient(patientStub);

    when(userService.getLoggedUser()).thenReturn(doctorStub);

    assertThat(imageService.getAllImages(0L)).hasSize(2);
  }
}
