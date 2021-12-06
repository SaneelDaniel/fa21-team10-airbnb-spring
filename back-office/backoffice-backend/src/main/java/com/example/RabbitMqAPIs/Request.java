package com.example.RabbitMqAPIs;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Request {
    private String requestId;
    private String userId;
    private String bookingId;
    private String requestType;
    private String requestDescription;
    
}
