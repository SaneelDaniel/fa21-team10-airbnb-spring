package com.example.airbnbpayments.bookingdetail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingRepository extends JpaRepository<BookingModel, Long> {

    @Query("SELECT * FROM BookingModel b WHERE b.userId = :userId")
    List<BookingModel> findByUserId(@Param("userId") Long userId);

}
