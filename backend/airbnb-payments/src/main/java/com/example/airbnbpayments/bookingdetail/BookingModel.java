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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String userId;
    private String propertyId;
    private String checkInDate;
    private String checkOutDate;
    private String bookingStatus;
    private String bookingAmount;
    private String bookingCurrency;
    private String bookingDate;
    private String bookingType;
    private String bookingPaymentStatus;
    private String bookingPaymentMethod;
    private String bookingPaymentDate;
    private String bookingPaymentAmount;
    private String bookingPaymentCurrency;
    private String bookingPaymentTransactionId;

}
