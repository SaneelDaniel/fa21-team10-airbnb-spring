package com.example.backofficebackend;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.Getter;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Getter
@RequiredArgsConstructor
@Table(name = "request")
public class RequestModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private long userId;
    private long bookingId;
    private String requestType;
    private String requestStatus;
    private String requestDescription;
    
}
