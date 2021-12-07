import React, { useContext, useState } from "react";
import api from "./State/Api";
import AppContext from "./State/AppContext";
import { useHistory } from "react-router-dom";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    api
      .login(email, password)
      .then((user) => {
        setUser(user);
        console.log(user);
        if (user) {
          history.push("/");
        }
      })
      .catch((err) => window.alert(err.message));
  };
  return (
    <div style={{ alignItems: "center", margin: "30px" }}>
      <h1>Backoffice Login</h1>
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
      >
        Login
      </button>
    </div>
  );
}
