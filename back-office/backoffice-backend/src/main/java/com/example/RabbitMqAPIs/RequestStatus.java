package com.example.RabbitMqAPIs;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RequestStatus {

    private Request request;
    private String status;
    private String message;
    
}
