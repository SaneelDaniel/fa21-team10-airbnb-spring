import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../State/AppContext';
import api from "../State/Api";

import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const context = useContext(AppContext);

  const signIn = (e) => {
    e.preventDefault();
    api.login(username, password)
    .then(user => context.SET_USER(user))
    .catch(e => window.alert('Something wrong happened.'));
  };

  const register = (e) => {
    e.preventDefault();

    history.push('/register');
  };

  if (context.loggedIn) {
    history.push('/home');
  }

  //Component / View for Login
  return (
    <div className="login">
      <div className="login__container">
        <h1>Sign-In</h1>
        <form>
          <h5>Username</h5>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={signIn} className="login__signInButton">
            Sign In
          </button>
        </form>
        <p> By signing-in you agree to our Conditions of Use & Sale. </p>

        <button onClick={register} className="login__registerButton">
          Create a New Account
        </button>
      </div>
    </div>
  );
}

export default Login;
