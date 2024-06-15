package com.doctorspatientmanagement.application.image.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@ResponseBody
@RequestMapping("/api/image")
public interface ImageApi {

  @GetMapping
  List<ImageDto> getImagesForPatient(@RequestParam Long patientId);

  @GetMapping("/{patientId}/{imageName}")
  ResponseEntity<byte[]> getPatientImage(@PathVariable Long patientId, @PathVariable String imageName)
    throws IOException;

  @PostMapping
  void storeImage(@RequestParam("image") MultipartFile imageToBeUploaded, @RequestParam("patientId") Long patientId);

  @DeleteMapping
  void removePatientImage(@RequestBody RemovePatientDto imageIds);
}
