package com.doctorspatientmanagement.application.doctor.configuration;

import com.doctorspatientmanagement.application.doctor.model.RoleOptions;
import com.doctorspatientmanagement.application.doctor.service.impl.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .authorizeRequests()
      .mvcMatchers("/h2-console/**")
      .permitAll();

    http
      .authorizeRequests()
      .mvcMatchers("/api/register", "/api/login", "/api/logged", "/api/confirm-profile/*")
      .permitAll()
      .mvcMatchers("/api/**")
      .hasAnyAuthority(RoleOptions.DOCTOR.name(), RoleOptions.ADMIN.name())
      .anyRequest()
      .authenticated()
      .and()
      .logout()
      .logoutUrl("/api/logout")
      .logoutSuccessHandler((request, response, authentication) -> {});

    http
      .csrf()
      .disable()
      .cors()
      .disable();
    http
      .headers()
      .frameOptions()
      .disable();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public DaoAuthenticationProvider daoAuthenticationProvider(
    PasswordEncoder passwordEncoder, UserDetailsServiceImpl userDetailsService) {
    DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
    daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
    daoAuthenticationProvider.setUserDetailsService(userDetailsService);
    return daoAuthenticationProvider;
  }
}
