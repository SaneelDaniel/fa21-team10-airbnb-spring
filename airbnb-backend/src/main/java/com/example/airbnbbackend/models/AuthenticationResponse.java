package com.example.airbnbbackend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class AuthenticationResponse {
    @Getter
    private final String jwt;
    @Getter
    private final String userName;
    @Getter
    private final int id;
}
