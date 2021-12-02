package com.example.airbnbbackend.models;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.RequiredArgsConstructor;

// @RequiredArgsConstructor
public class MyUserDetails implements UserDetails{
    private int id;
    private String username;
    private String password;
    // private ArrayList<String> roles;

    public MyUserDetails(User user) {
        this.username = user.getUserName();
        this.password = user.getPassword();
        this.id = user.getId();

    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return new  ArrayList<>();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public int getId() {
        return id;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    
}
