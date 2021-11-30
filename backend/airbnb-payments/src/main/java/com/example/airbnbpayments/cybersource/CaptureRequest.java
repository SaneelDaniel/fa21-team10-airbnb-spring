package com.example.airbnbpayments.cybersource;

public class CaptureRequest extends Payload {

    public String reference;
    public String paymentId;
    public String transactionAmount;
    public String transactionCurrency;

}
