import React, { useContext, useState } from 'react';
import './Header.css';
import LanguageIcon from '@material-ui/icons/Language';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Avatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AppContext from '../State/AppContext';

function Header() {
  const history = useHistory();
  const context = useContext(AppContext);
  const loggedIn = context.loggedIn;
  const user = context.user ? context.user.userName : "Guest";
  const logOut = (e) => {
    e.preventDefault();

    context.LOGOUT();
  }

  const toAuth = (e) => {
    e.preventDefault();
    history.push('/')
  }

  const UserButtons = () => (
    <>
      <p>{user}</p>
      <Button variant="outlined" onClick={logOut}>Log out</Button>
    </>
  )

  const GuestButtons = () => (
    <>
      <p>Guest</p>
      <Button variant="outlined" onClick={toAuth}>Login/Register</Button>
    </>
  )
  
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__icon"
          src="https://i.pinimg.com/originals/3c/bf/be/3cbfbe148597341fa56f2f87ade90956.png"
          alt=""
        />
      </Link>

      <div className="header__right">
        <LanguageIcon />
        <ExpandMoreIcon />
        <Avatar />
        {loggedIn ? <UserButtons /> : <GuestButtons />}
      </div>
    </div>
  );
}

export default Header;
