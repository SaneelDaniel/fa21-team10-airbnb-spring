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
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.validation.BindingResult;

import lombok.Getter;
import lombok.Setter;

import lombok.extern.slf4j.Slf4j;

import com.example.airbnbpayments.PaymentsRepository;

/**
 * The REST Controller Class for the payments service
 * 
 */
@Slf4j
@Controller
@RequestMapping("/")
public class PaymentsController {

    @Autowired
    private PaymentsRepository paymentsRepository;

    @GetMapping
    public String getAction() {

        return "Hello From Payments";

    }

}
