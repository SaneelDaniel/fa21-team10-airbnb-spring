package com.example.airbnbpayments.bookingdetail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingRepository extends JpaRepository<BookingModel, Long> {

    // @Query("SELECT * FROM BookingModel b WHERE b.userId = :userId")

    // get bookingmodel by userId
    @Query(value = "SELECT * FROM bookings b WHERE b.user_Id = :userId", nativeQuery = true)
    List<BookingModel> findByUserId(@Param("userId") Long userId);

    // get bookingmodel by bookingId
    @Query(value = "SELECT * FROM bookings b WHERE b.bookingId = :bookingId", nativeQuery = true)
    BookingModel findByBookingId(@Param("bookingId") Long bookingId);

}
