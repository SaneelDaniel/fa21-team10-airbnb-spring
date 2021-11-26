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
@Table(name = "Payments")
class PaymentModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    transient private String action;
    private String firstname;
    private String lastname;
    private String address;
    private String city;
    private String state;
    private String zip;
    private String phonenumber;
    private String cardnumber;
    private String expmonth;
    private String expyear;
    private String cvv;
    private String email;
    private String notes;

    private String orderNumber;
    private String propertyId;
    private String transactionAmount;
    private String transactionCurrency;
    private String authId;
    private String authStatus;
    private String captureId;
    private String captureStatus;
}
