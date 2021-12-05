import PropTypes from 'prop-types';
import React from 'react';
import Logo from './Logo/Logo';
import NavLink from './NavLink/NavLink';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import SearchBar from './SearchBar/SearchBar';
import { withRouter } from 'react-router-dom';

const StyledAppBar = styled(AppBar)`
  && {
    height: 81px !important;
    box-shadow: none;
    ${(props) =>
      props.transparent
        ? `
        background-color: transparent;
        border: none;
        color: #fff;`
        : `
        background-color: rgb(255, 255, 255);
        border-bottom: 1px solid rgb(228, 228, 228);
        color: #000;`};
  }
`;
const linkStyle = {
  margin: '1rem',
  textDecoration: 'none',
  color: 'black',
  fontWeight: 'bold',
};

const Header = ({ location }) => {
  const isHome = location.pathname === '/';
  const isLoginSignUp =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/password';
  return (
    <StyledAppBar
      position="fixed"
      color="inherit"
      transparent={isHome ? 'true' : undefined}
    >
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Logo isHome={isHome} />
          {/* Mobile menu */}
          {/* <div className={classes.dropdownMenu}>
            <DropDownMenu />
          </div> */}
        </Grid>
        <Grid>
          <SearchBar isHome={isHome || isLoginSignUp} />
        </Grid>
        <Grid>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
          <Link to="/signup" style={linkStyle}>
            SignUp
          </Link>
          <Link to="/password" style={linkStyle}>
            Password
          </Link>
          <Link to="/bookings" style={linkStyle}>
            Bookings
          </Link>
          <Link to="/homelisting" style={linkStyle}>
            Listings1
          </Link>
          <Link to="/listings" style={linkStyle}>
            Listings2
          </Link>
        </Grid>
      </Grid>
    </StyledAppBar>
  );
};
export default withRouter(Header);

Header.propTypes = {
  location: PropTypes.object.isRequired,
};
