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
import com.example.airbnbpayments.cybersource.*;

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

    private static boolean DEBUG = true;

    @Value("${cybersource.apihost}")
    private String apiHost;
    @Value("${cybersource.merchantkeyid}")
    private String merchantKeyId;
    @Value("${cybersource.merchantsecretkey}")
    private String merchantsecretKey;
    @Value("${cybersource.merchantid}")
    private String merchantId;

    private CyberSourceAPI api = new CyberSourceAPI();

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
    @PostMapping("/booking")
    public ResponseEntity<?> postAction(@RequestBody BookingModel body) {

        // save the tempModel to the database and return the id
        BookingModel temp = bookingDetailRepository.save(body);
        return ResponseEntity.ok(temp.getId());
    }

    // post action to add a new payment
    @PostMapping("/payments")
    public ResponseEntity<?> postPayment(@RequestBody PaymentModel body) {
        // save the payment to the database and return the id

        // setup cybersource api
        CyberSourceAPI.setHost(apiHost);
        CyberSourceAPI.setKey(merchantKeyId);
        CyberSourceAPI.setSecret(merchantsecretKey);
        CyberSourceAPI.setMerchant(merchantId);

        boolean hasErrors = verifyPaymentDetails(body);

        PaymentModel temp = paymentsRepository.save(body);
        return ResponseEntity.ok(temp.getId());
    }

    /**
     * Helper Function to verify all payment Details
     * 
     * @return boolean
     */
    private boolean verifyPaymentDetails(PaymentModel command) {
        // check if the payment is valid
        CityAndStatesMapped cityStateMap = new CityAndStatesMapped();
        boolean hasErrors = false;
        if (command.getFirstname().equals("")) {
            hasErrors = true;

        }
        if (command.getLastname().equals("")) {
            hasErrors = true;

        }
        if (command.getAddress().equals("")) {
            hasErrors = true;

        }
        if (command.getCity().equals("")) {
            hasErrors = true;

        }
        if (command.getState().equals("")) {
            hasErrors = true;

        }
        if (command.getZip().equals("")) {
            hasErrors = true;

        }
        if (command.getPhonenumber().equals("")) {
            hasErrors = true;
        }
        if (command.getCardnumber().equals("")) {
            hasErrors = true;
        }
        if (command.getExpmonth().equals("")) {
            hasErrors = true;
        }
        if (command.getExpyear().equals("")) {
            hasErrors = true;
        }
        if (command.getCvv().equals("")) {
            hasErrors = true;
        }
        if (command.getEmail().equals("")) {
            hasErrors = true;
        }

        if (!command.getZip().matches("\\d{5}")) {
            hasErrors = true;
        }
        if (!command.getPhonenumber().matches("[(]\\d{3}[)] \\d{3}-\\d{4}")) {
            hasErrors = true;
        }
        if (!command.getCvv().matches("\\d{3}")) {
            hasErrors = true;
        }
        if (!command.getCardnumber().matches("((?:(?:\\d{4}[- ]){3}\\d{4}|\\d{16}))(?![\\d])")) {
            hasErrors = true;
        }
        if (!command.getExpyear().matches("\\d{4}")) {
            hasErrors = true;
        }

        if (cityStateMap.months.get(command.getExpmonth()) == null) {
            hasErrors = true;
        }

        if (cityStateMap.states.get(command.getState()) == null) {
            hasErrors = true;
        }

        return hasErrors;
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
        log.info("PaymentsController.getBookingByUserId()");
        log.info("id: {}", id);

        List<BookingModel> booking = bookingDetailRepository.findByUserId(id);
        if (booking.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(booking);
        }
    }

}
