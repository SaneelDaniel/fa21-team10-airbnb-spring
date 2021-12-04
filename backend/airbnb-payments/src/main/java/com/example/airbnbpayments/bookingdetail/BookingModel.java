package com.example.airbnbpayments.bookingdetail;

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
@Table(name = "Bookings")
public class BookingModel {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String userId;
    private String propertyId;
    // private String checkInDate;
    // private String checkOutDate;
    private String status;
    private String amount;
    private String currency;
    private String date;
    // private String bookingType;
    private String paymentStatus;
    private String paymentMethod;
    private String paymentTransactionId;
    private String paymentTransactionStatus;
    private String paymentCaptureId;
    private String paymentCaptureStatus;
}
