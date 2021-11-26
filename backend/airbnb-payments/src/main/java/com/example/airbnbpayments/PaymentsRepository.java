package com.example.airbnbpayments;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentsRepository extends JpaRepository<PaymentModel, Long> {

}
