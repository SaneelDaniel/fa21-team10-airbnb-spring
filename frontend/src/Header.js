import React, { useState } from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import LanguageIcon from '@material-ui/icons/Language';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Header() {
  const [loggedIn, setLoggedIn] = React.useState(false);
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
        {loggedIn ? <p>UserName:</p> : 'User'}
      </div>
    </div>
  );
}

export default Header;
