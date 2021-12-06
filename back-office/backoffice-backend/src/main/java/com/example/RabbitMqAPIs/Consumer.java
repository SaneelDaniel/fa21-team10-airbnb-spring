package com.example.RabbitMqAPIs;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Optional;


@RestController
@Component
@RequestMapping("/consumer")
public class Consumer {
    
    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }

    @GetMapping("/getRequest")
    @RabbitListener (queues = Config.QUEUE_NAME)
    public ResponseEntity<Optional<RequestStatus>> consumeMessage(RequestStatus requestStatus) {
        return ResponseEntity.ok(Optional.of(requestStatus));

    }
}
