package com.example.airbnbbackend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class AuthenticationResponse {
    @Getter
    private final String jwt;
}
