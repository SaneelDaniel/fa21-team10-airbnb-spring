package com.example.backofficebackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import java.util.Optional;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;


@Controller
@CrossOrigin (origins = "*")
@RequestMapping("/request")
public class RequestController {
    @Autowired
    private RequestRepository requestRepository;

    @RequestMapping("/ping")
    public ResponseEntity<?> getAction() {
        System.out.println("RequestController.getAction()");
        return ResponseEntity.ok("The server is runnign");
    }

    //Get one specific request
    @GetMapping("/{id}")
    public ResponseEntity<Optional<RequestModel>> getRequest(@RequestParam(value = "id", required = true) Long id) {
        Optional<RequestModel> request = requestRepository.findById(id);
        if (request.isPresent()) {
            return ResponseEntity.ok(request);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get all requests
    @GetMapping("/all")
    public ResponseEntity<Iterable<RequestModel>> getAllRequests() {
        List<RequestModel> requests= requestRepository.findAll();
        if (requests.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(requests);
        }
    }
    
    //Get all requests for a specific user
    // @GetMapping("/user/{id}")
    // public ResponseEntity<Iterable<RequestModel>> getAllRequestsForUser(@RequestParam(value = "id", required = true) Long id) {
    //     List<RequestModel> requests= requestRepository.findByUserId(user);
    //     if (requests.isEmpty()) {
    //         return ResponseEntity.notFound().build();
    //     } else {
    //         return ResponseEntity.ok(requests);
    //     }
    // }

    //POST requests
    //Create a new request
    @PostMapping("/create")
    public ResponseEntity<RequestModel> createRequest(@RequestBody RequestModel request) {

        Optional<RequestModel> requestExists = requestRepository.findById(request.getId());
        if (requestExists.isPresent()) {
            return ResponseEntity.badRequest().build();
        } else {
            requestRepository.save(request);
            return ResponseEntity.ok(request);
        }
    }

    //Resolve a request
    @PostMapping("/resolve")
    public ResponseEntity<RequestModel> resolveRequest(@RequestBody RequestModel request) {
        Optional<RequestModel> requestExists = requestRepository.findById(request.getId());

        if(!requestExists.isPresent()){
            return ResponseEntity.badRequest().build();
        }
        requestExists.get().setRequestStatus(request.getRequestStatus());
        requestRepository.save(requestExists.get());
        requestExists= requestRepository.findById(request.getId());
        
        return ResponseEntity.ok(requestExists.get());

    }

    //Delete a request
    @DeleteMapping("/delete")
    public ResponseEntity<RequestModel> deleteRequest(@RequestParam(value = "id", required = true) Long id) {
        Optional<RequestModel> request = requestRepository.findById(id);
        if (request.isPresent()) {
            requestRepository.delete(request.get());
            return ResponseEntity.ok(request.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
