import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (e) => {
    // e.preventDefault();
    console.log("Login Req: ", email, password);
    try {
      const res = await axios.post(
        "http://34.134.225.229/auth/api/auth/login",
        {
          headers: { "Access-Control-Allow-Origin": "*" },
        },
        {
          email,
          password,
        }
      );
      console.log(res);
    } catch (error) {}
  };
  return (
    <div>
      <h1>Auth Page</h1>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        onClick={(e) => {
          login(e);
        }}
        onP
      >
        Login
      </button>
    </div>
  );
}
