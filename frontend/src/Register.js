import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './Register.css';
import Popup from 'react-popup';
import axios from 'axios';
import api from "./State/Api";
// import { useStateValue } from './State/StateProvider';
import AppContext from './State/AppContext';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const context = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    console.log(context);
  }, [])

  const register = (e) => {
    e.preventDefault();

    if (!password) {
      window.alert('Please enter a Password');
    } else if (!username) {
      window.alert('Please enter Username');
    } else if (password !== confirmPassword) {
      window.alert('Passwords Do Not Match');
    } else {
      //do the registration here
      // do registration
      api.register(username, password)
        .then(user => context.SET_USER(user))
        .catch(e => window.alert('Something wrong happened.'));
    }
  };

  if (context.loggedIn) {
    console.log("LOGGED IN");
    history.push('/home');
  }

  return (
    <div className="register">
      <Popup />
      <div className="register__container">
        <h1>Create New Account</h1>
        <form>
          <h5>Username</h5>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h5>Confirm Password</h5>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </form>
        <p> By signing-in you agree to our Conditions of Use & Sale. </p>

        <button onClick={register} className="login__registerButton">
          Create a New Account
        </button>
      </div>
    </div>
  );
}

export default Register;
