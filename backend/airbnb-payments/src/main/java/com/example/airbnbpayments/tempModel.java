package com.example.airbnbpayments;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.Getter;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Getter
@RequiredArgsConstructor
@Table(name = "temp_model")
public class tempModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firstname;
    private String lastname;
    private String address;
}
