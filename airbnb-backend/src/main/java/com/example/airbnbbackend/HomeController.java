package com.example.airbnbbackend;

import com.example.airbnbbackend.models.AuthenticationRequest;
import com.example.airbnbbackend.models.AuthenticationResponse;
import com.example.airbnbbackend.models.MyUserDetails;
import com.example.airbnbbackend.models.User;
import com.example.airbnbbackend.models.UserRepository;
import com.example.airbnbbackend.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/")
    public String home() {
        return "HELLO WORLD";
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
            throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                            authenticationRequest.getPassword()));

        } catch (BadCredentialsException e) {
            // TODO: handle exception
            System.out.println(e);
            throw new Exception("Incorrect username or password", e);
        } catch (Exception e) {
            System.out.println(e);
        }

        final MyUserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new AuthenticationResponse(jwt, userDetails.getUsername(), userDetails.getId()));
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> RegisterUser(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            User user = userRepository.save(new User(authenticationRequest));
            final MyUserDetails userDetails = userDetailsService
                    .loadUserByUsername(authenticationRequest.getUsername());

            final String jwt = jwtTokenUtil.generateToken(userDetails);
            return ResponseEntity.ok(new AuthenticationResponse(jwt, userDetails.getUsername(), userDetails.getId()));

        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e);
            return ResponseEntity.internalServerError().body("error");
        }
    }

}
