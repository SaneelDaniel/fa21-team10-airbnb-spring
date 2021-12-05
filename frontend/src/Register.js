import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './Register.css';
import Popup from 'react-popup';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  //   const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    getProperties();
  });

  const getProperties = async () => {
    axios
      .get('http://localhost:8080/property/all')
      .then((res) => {
        console.log('Property REsponse ', res.data);
      })
      .catch((err) => {
        console.log('Property Err ', err);
      });
  };

  const register = (e) => {
    e.preventDefault();

    if (!password) {
      window.alert('Please enter a Password');
    } else if (!email) {
      window.alert('Please enter an Password');
    } else if (!firstName) {
      window.alert('Please enter a First Name');
    } else if (!lastName) {
      window.alert('Please enter a Last Name');
    } else if (password !== confirmPassword) {
      window.alert('Passwords Do Not Match');
    } else {
      //do the registration here
      // do registration
    }
  };

  return (
    <div className="register">
      <Popup />
      <div className="register__container">
        <h1>Create New Account</h1>
        <form>
          <h5>E-mail</h5>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

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
