package com.example.airbnbpayments;

import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.util.Optional;
import java.time.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64.Encoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.validation.BindingResult;

import lombok.Getter;
import lombok.Setter;

import lombok.extern.slf4j.Slf4j;

import com.example.airbnbpayments.PaymentsRepository;
import com.example.airbnbpayments.bookingdetail.*;

/**
 * The REST Controller Class for the payments service
 */
@Slf4j
@Controller

public class PaymentsController {

    @Autowired
    private PaymentsRepository paymentsRepository;

    @Autowired
    private BookingRepository bookingDetailRepository;

    @Autowired
    private tempModelRepository tempRepository;

    @RequestMapping("/")
    public ResponseEntity<?> getAction() {
        return ResponseEntity.ok("Hello From Payments");
    }

    // a get request to get all the payments
    @GetMapping("/payments")
    public ResponseEntity<?> getPayments() {
        return ResponseEntity.ok(tempRepository.findAll());
    }

    // post mapping for the payments service
    @PostMapping("/payments")
    public ResponseEntity<?> postAction(@RequestBody BookingModel body) {
        log.info("PaymentsController.postAction()");
        // log.info("body: {}", body.getFirstname());

        // verify the body to have all the required fields
        // if (body.getFirstname() == null || body.getLastname() == null) {
        // return ResponseEntity.badRequest().body("Missing required fields");
        // }

        // save the tempModel to the database and return the id
        BookingModel temp = bookingDetailRepository.save(body);
        return ResponseEntity.ok(temp.getId());
    }

    // get all bookings from the database
    @GetMapping("/bookings")
    public ResponseEntity<?> getBookings() {
        return ResponseEntity.ok(bookingDetailRepository.findAll());
    }

    // get a booking from the database
    @GetMapping("/bookings/{id}")
    public ResponseEntity<?> getBooking(@PathVariable("id") Long id) {
        Optional<BookingModel> booking = bookingDetailRepository.findById(id);
        if (booking.isPresent()) {
            return ResponseEntity.ok(booking.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // get booking by user id
    @GetMapping("/bookings/user/{id}")
    public ResponseEntity<?> getBookingByUserId(@PathVariable("id") Long id) {
        List<BookingModel> booking = bookingDetailRepository.findByUserId(id);
        if (booking.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(booking);
        }
    }

}
