package com.doctorspatientmanagement.application.doctor.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByEmail(String email);

  @Query(value = "SELECT id, email, username, password, is_active, created_at, updated_at FROM users WHERE id = :id",
    nativeQuery = true)
  User getUserById(@Param("id") Long id);
}
