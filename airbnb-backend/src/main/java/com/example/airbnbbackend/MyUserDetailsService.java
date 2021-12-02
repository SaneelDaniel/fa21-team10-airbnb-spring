package com.example.airbnbbackend;

import java.util.ArrayList;
import java.util.Optional;

import com.example.airbnbbackend.models.MyUserDetails;
import com.example.airbnbbackend.models.User;
import com.example.airbnbbackend.models.UserRepository;
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepository repository;

    @Override
    public MyUserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
        // return new User("admin", "admin", new ArrayList<>());

        Optional<User> user = repository.findByUserName(userName);
        user.orElseThrow(() -> new UsernameNotFoundException("Invalid username or password"));
        return user.map(MyUserDetails::new).get();
    }

}
