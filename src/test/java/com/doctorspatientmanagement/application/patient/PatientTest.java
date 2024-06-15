package com.doctorspatientmanagement.application.patient;

import com.doctorspatientmanagement.application.doctor.model.User;
import com.doctorspatientmanagement.application.doctor.service.UserService;
import com.doctorspatientmanagement.application.mother.PatientMother;
import com.doctorspatientmanagement.application.patient.model.Patient;
import com.doctorspatientmanagement.application.patient.model.PatientRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class PatientTest {

  @Autowired
  private UserService userService;

  @Autowired
  private PatientRepository patientRepository;

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private WebApplicationContext webApplicationContext;

  @Autowired
  private PatientMother patientMother;

  @PersistenceContext
  private EntityManager entityManager;

  @BeforeEach
  public void setup() {
    mockMvc = MockMvcBuilders
      .webAppContextSetup(webApplicationContext)
      .apply(springSecurity())
      .build();
  }

  @Test
  @WithUserDetails(value = "email@email.com")
  void itGetsAllPatients() throws Exception {
    // prepare data
    User doctor = userService.getLoggedUser();

    patientRepository.save(patientMother
      .patient(doctor)
      .build());
    patientRepository.save(patientMother
      .patient(doctor)
      .firstName("FirstName")
      .lastName("LastName")
      .fullName("FirstName LastName")
      .build());

    // execute
    mockMvc
      .perform(get("/api/patient"))
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(jsonPath("$[0].firstName").value("FirstName"))
      .andExpect(jsonPath("$[0].lastName").value("LastName"))
      .andExpect(jsonPath("$[0].fullName").value("FirstName LastName"))
      .andExpect(jsonPath("$[0].email").value("patient@gmail.com"))
      .andExpect(jsonPath("$[0].phone").value("123123"))
      .andExpect(jsonPath("$[1].firstName").value("Hidden"))
      .andExpect(jsonPath("$[1].lastName").value("Eden"));
  }

  @Test
  @WithUserDetails(value = "email@email.com")
  void itStoresPatient() throws Exception {
    String patientPayload = "{\"firstName\":\"Batman\",\"lastName\":\"Unknown\",\"phone\":\"123123123\"," +
      "\"email\":\"thebat@gmail.com\"}";

    mockMvc
      .perform(post("/api/patient")
        .content(patientPayload)
        .contentType(MediaType.APPLICATION_JSON))
      .andDo(print());

    Patient storedPatient = patientRepository.findPatientByEmail("thebat@gmail.com");
    assertThat(storedPatient.getEmail()).isEqualTo("thebat@gmail.com");
    assertThat(storedPatient.getFirstName()).isEqualTo("Batman");
    assertThat(storedPatient.getLastName()).isEqualTo("Unknown");
    assertThat(storedPatient.getId()).isNotNull();
    assertThat(storedPatient.getUpdatedAt()).isNotNull();
  }

  @Test
  @WithUserDetails(value = "email@email.com")
  void itUpdatesPatient() throws Exception {
    User doctor = userService.getLoggedUser();

    Patient patientStub = patientMother
      .patient(doctor)
      .build();
    doctor.addPatient(patientStub);
    entityManager.flush();

    Patient doctorPatient = doctor
      .getPatients()
      .stream()
      .findFirst()
      .orElseThrow();

    Map<String, Object> params = new HashMap<>();
    params.put(
      "id",
      doctorPatient
        .getId()
        .toString());
    params.put("firstName", "UPDATE");
    String updatePatientPayload = new ObjectMapper().writeValueAsString(params);

    mockMvc
      .perform(patch("/api/patient")
        .content(updatePatientPayload)
        .contentType(MediaType.APPLICATION_JSON))
      .andDo(print());

    Patient updatedPatient = doctor
      .getPatients()
      .stream()
      .findFirst()
      .orElseThrow();

    assertThat(updatedPatient.getFirstName()).isEqualTo("UPDATE");
  }

  @Test
  @WithUserDetails(value = "email@email.com")
  void itDeletesPatient() throws Exception {
    User doctor = userService.getLoggedUser();

    Patient patientStub = patientMother
      .patient(doctor)
      .build();

    doctor.addPatient(patientStub);
    entityManager.flush();

    Patient patientRemove = doctor
      .getPatients()
      .stream()
      .findFirst()
      .orElseThrow();

    mockMvc
      .perform(delete("/api/patient/{patientId}", patientRemove.getId()).contentType(MediaType.APPLICATION_JSON))
      .andDo(print());

    assertThat(doctor.getPatients()).isNullOrEmpty();
  }
}
