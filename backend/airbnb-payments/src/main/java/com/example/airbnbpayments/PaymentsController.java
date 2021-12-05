package com.example.airbnbpayments;

import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.util.Optional;
import java.time.*;
import java.util.ArrayList;
import java.util.Date;
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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.validation.BindingResult;

import lombok.AllArgsConstructor;
import lombok.Data;
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
@CrossOrigin(origins = "*")
@RequestMapping("/payments")
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
    @GetMapping("/getAllPayments")
    public ResponseEntity<?> getPayments() {
        return ResponseEntity.ok(tempRepository.findAll());
    }

    // post mapping for the payments service
    @PostMapping("/newBooking")
    public ResponseEntity<?> postAction(@RequestBody BookingModel body) {
        // save the tempModel to the database and return the id
        BookingModel temp = bookingDetailRepository.save(body);
        return ResponseEntity.ok(temp.getId());
    }

    // post action to add a new payment
    @PostMapping("/newPayment")
    public ResponseEntity<?> postPayment(@RequestBody PaymentModel body) {
        // save the payment to the database and return the id

        log.info("Payment Data Received: " + body.toString());
        // setup cybersource api
        CyberSourceAPI.setHost(apiHost);
        CyberSourceAPI.setKey(merchantKeyId);
        CyberSourceAPI.setSecret(merchantsecretKey);
        CyberSourceAPI.setMerchant(merchantId);

        List<String> hasErrors = verifyPaymentDetails(body);

        if (hasErrors.size() > 0) {
            for (String error : hasErrors) {
                log.info("Error: line 109: " + error);
            }
            return new ResponseEntity<List<String>>(
                    hasErrors,
                    org.springframework.http.HttpStatus.BAD_REQUEST);
        }

        int min = 1239871;
        int max = 9999999;
        int random_int = (int) Math.floor(Math.random() * (max - min + 1) + min);
        String order_num = String.valueOf(random_int);
        AuthRequest auth = new AuthRequest();
        auth.reference = order_num;
        auth.billToFirstName = body.getFirstname();
        auth.billToLastName = body.getLastname();
        auth.billToAddress = body.getAddress();
        auth.billToCity = body.getCity();
        auth.billToState = body.getState();
        auth.billToZipCode = body.getZip();
        auth.billToPhone = body.getPhonenumber();
        auth.billToEmail = body.getEmail();
        auth.transactionAmount = body.getTransactionamount();
        auth.transactionCurrency = "USD";
        auth.cardNumber = body.getCardnumber();
        auth.cardExpMonth = CityAndStatesMapped.months.get(body.getExpmonth());
        auth.cardExpYear = body.getExpyear();
        auth.cardCVV = body.getCvv();
        auth.cardType = CyberSourceAPI.getCardType(auth.cardNumber);
        System.out.println("Auth card type" + auth.cardType);

        if (auth.cardType.equals("ERROR")) {
            System.out.println("Unsupported Credit Card Type.");
            // model.addAttribute("message", "Unsupported Credit Card Type.");
            // "ERROR", "Unsupported Credit Card Type"
            // return a bad request with the error message
            return new ResponseEntity<String>(
                    "Unsupported Credit Card Type.",
                    org.springframework.http.HttpStatus.BAD_REQUEST);
        }
        boolean authValid = true;
        AuthResponse authResponse = new AuthResponse();
        System.out.println("\n\nAuth Request: " + auth.toJson());
        authResponse = api.authorize(auth);
        System.out.println("\n\nAuth Response: " + authResponse.toJson());
        if (!authResponse.status.equals("AUTHORIZED")) {
            authValid = false;
            System.out.println(authResponse.message);
            // model.addAttribute("message", authResponse.message);
            // "UNAUTHORIZED Credit Card Type"
            // return a bad request with the error message
            return new ResponseEntity<String>(
                    "UNAUTHORIZED Credit Card Type",
                    org.springframework.http.HttpStatus.BAD_REQUEST);
        }

        boolean captureValid = true;
        CaptureRequest capture = new CaptureRequest();
        CaptureResponse captureResponse = new CaptureResponse();
        if (authValid) {
            capture.reference = order_num;
            capture.paymentId = authResponse.id;
            capture.transactionAmount = body.getTransactionamount();
            capture.transactionCurrency = "USD";
            System.out.println("\n\nCapture Request: " + capture.toJson());
            captureResponse = api.capture(capture);
            System.out.println("\n\nCapture Response: " + captureResponse.toJson());
            if (!captureResponse.status.equals("PENDING")) {
                captureValid = false;
                System.out.println(captureResponse.message);
                // model.addAttribute("message", captureResponse.message);
                // errArray.add("PENDING Credit Card Type");
            }
        }

        /* Render View */

        BookingModel book = null;

        if (authValid && captureValid) {
            // create a new booking model
            BookingModel booking = new BookingModel();
            booking.setUserId(body.getUserid());
            booking.setPropertyId(body.getPropertyid());
            booking.setStatus("PAID");
            booking.setAmount(body.getTransactionamount());
            booking.setCurrency("USD");
            booking.setDate(LocalDate.now().toString());
            booking.setPaymentStatus("PAID");
            booking.setPaymentMethod("CREDIT CARD");
            booking.setPaymentTransactionId(authResponse.id);
            booking.setPaymentTransactionStatus(authResponse.status);
            booking.setPaymentCaptureId(captureResponse.id);
            booking.setPaymentCaptureStatus(captureResponse.status);
            // temp = paymentsRepository.save(body);
            book = bookingDetailRepository.save(booking);
        }

        if (book != null) {
            final String uri = "http://localhost:8080/property/" + body.getPropertyid();

            RestTemplate restTemplate = new RestTemplate();
            String result = restTemplate.getForObject(uri, String.class);

            System.out.println("Property Request Call Result" + result);
            Map<String, Object> map = new HashMap<>();
            map.put("booking", book);
            map.put("property", result);
            return ResponseEntity.ok(map);
        }

        return ResponseEntity.badRequest().body("Uncaught Error Occured");
    }

    /**
     * Helper Function to verify all payment Details
     * 
     * @return boolean
     */
    private List<String> verifyPaymentDetails(PaymentModel command) {
        // check if the payment is valid
        List<String> errArray = new ArrayList<String>();
        CityAndStatesMapped cityStateMap = new CityAndStatesMapped();
        boolean hasErrors = false;
        if (command.getFirstname().equals("")) {
            errArray.add("First Name is required");
        }
        if (command.getLastname().equals("")) {
            errArray.add("Last Name is required");
        }
        if (command.getAddress().equals("")) {
            errArray.add("Address is required");
        }
        if (command.getCity().equals("")) {
            errArray.add("City is required");
        }
        if (command.getState().equals("")) {
            errArray.add("State is required");
        }
        if (command.getZip().equals("")) {
            errArray.add("Zip Code is required");
        }
        if (command.getPhonenumber().equals("")) {
            errArray.add("Phone Number is required");
        }
        if (command.getCardnumber().equals("")) {
            errArray.add("Credit Card Number is required");
        }
        if (command.getExpmonth().equals("")) {
            errArray.add("Expiration Month is required");
        }
        if (command.getExpyear().equals("")) {
            errArray.add("Expiration Year is required");
        }
        if (command.getCvv().equals("")) {
            errArray.add("CVV is required");
        }
        if (command.getEmail().equals("")) {
            errArray.add("Email is required");
        }

        if (!command.getZip().matches("\\d{5}")) {
            errArray.add("Zip Code must be 5 digits");
        }
        if (!command.getPhonenumber().matches("[(]\\d{3}[)] \\d{3}-\\d{4}")) {
            errArray.add("Phone Number must be in the format (xxx) xxx-xxxx");
        }
        if (!command.getCvv().matches("\\d{3}")) {
            errArray.add("CVV must be 3 digits");
        }
        if (!command.getCardnumber().matches("((?:(?:\\d{4}[- ]){3}\\d{4}|\\d{16}))(?![\\d])")) {
            errArray.add("Credit Card Number must be 16 digits");
        }
        if (!command.getExpyear().matches("\\d{4}")) {
            errArray.add("Expiration Year must be 4 digits");
        }

        if (cityStateMap.months.get(command.getExpmonth()) == null) {
            errArray.add("Expiration Month is invalid");
        }

        if (cityStateMap.states.get(command.getState()) == null) {
            errArray.add("State is invalid");
        }

        return errArray;
    }

    // get all bookings from the database
    @GetMapping("/allBookings")
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

            List<PropertyModel> propertyList = new ArrayList<>();
            Map<Long, BookingDetailReturnValues> bookingPropertyMap = new HashMap<>();
            for (BookingModel b : booking) {
                final String uri = "http://localhost:8080/property/" + b.getPropertyId();
                RestTemplate restTemplate = new RestTemplate();
                PropertyModel result = restTemplate.getForObject(uri, PropertyModel.class);
                BookingDetailReturnValues bookingDetailReturnValues = new BookingDetailReturnValues(
                        Long.parseLong(b.getPropertyId()), result, b.getDate());

                bookingPropertyMap.put(Long.parseLong(b.getPropertyId()), bookingDetailReturnValues);
            }

            for (Long entry : bookingPropertyMap.keySet()) {
                log.info("Key: {}", entry);
                log.info("Value: {}", bookingPropertyMap.get(entry));
            }

            return ResponseEntity.ok(bookingPropertyMap);
        }
    }

    /**
     * Helper Class For Get Payment By User Id Method
     */
    @Data
    @AllArgsConstructor
    private class BookingDetailReturnValues {
        Long id;
        PropertyModel property;
        String bookingDate;
    }

}
