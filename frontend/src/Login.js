import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { printEndpoints } from './State/Api';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    printEndpoints();
  }, [])

  //sign in function for firebase authentication
  const signIn = (e) => {
    e.preventDefault();
    // some firebase signin shit
  };

  //Register function with firebase authentication
  const register = (e) => {
    e.preventDefault();

    // some firebase register shit
    history.push('/register');
  };

  //Component / View for Login
  return (
    <div className="login">
      <div className="login__container">
        <h1>Sign-In</h1>
        <form>
          <h5>E-mail</h5>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

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
