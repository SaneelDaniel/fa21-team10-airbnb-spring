package com.example.airbnbbackend;

import com.example.airbnbbackend.models.UserRepository;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = UserRepository.class)
public class AirbnbBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AirbnbBackendApplication.class, args);
	}

}
