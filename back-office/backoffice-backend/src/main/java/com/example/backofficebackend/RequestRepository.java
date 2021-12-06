package com.example.backofficebackend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RequestRepository extends JpaRepository<RequestModel, Long> {

    // find all requests for a specific user
    @Query(value = "SELECT * FROM request WHERE user_id = ?1", nativeQuery = true)
    List<RequestModel> findAllByUserId(@Param("userId") Long userId);
}
