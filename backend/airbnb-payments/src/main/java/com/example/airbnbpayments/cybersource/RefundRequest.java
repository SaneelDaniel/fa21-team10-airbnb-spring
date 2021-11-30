package com.example.airbnbpayments.cybersource;

public class RefundRequest extends Payload {

    public String reference;
    public String captureId;
    public String transactionAmount;
    public String transactionCurrency;

}
