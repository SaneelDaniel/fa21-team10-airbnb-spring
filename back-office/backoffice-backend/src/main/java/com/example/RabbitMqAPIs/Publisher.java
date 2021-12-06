package com.example.RabbitMqAPIs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import java.util.*;



@RestController
@RequestMapping("/requestPublisher")
public class Publisher {
    
    @GetMapping("ping")
    public String ping() {
        return "pong";
    }

    @Autowired 
    private RabbitTemplate rabbitTemplate;


    @PostMapping("/{userId}")
    public String createRequest(@RequestBody Request request, @PathVariable String userId) {
        System.out.println("Request: " + request);

        request.setRequestId(UUID.randomUUID().toString());

        //Create a request status object
        RequestStatus requestStatus = new RequestStatus(request, "Pending", "Request Created");
        rabbitTemplate.convertAndSend(Config.EXCHANGE_NAME, Config.ROUTING_KEY, requestStatus.toString());
        return "Request sent";
    }


}
