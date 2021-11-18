package com.example.airbnbbackend.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.UniqueConstraint;

import lombok.Data;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(unique = true)
    private String userName;
    private String password;

    public User(AuthenticationRequest auth) {
        this.userName = auth.getUsername();
        this.password = auth.getPassword();
    }


}
