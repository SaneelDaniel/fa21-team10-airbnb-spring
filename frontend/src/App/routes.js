import React from 'react';
import { Route, Switch } from 'react-router';
import AuthRoute from '../shared/Auth/AuthRoute';
import NotAuthRoute from '../shared/Auth/NotAuthRoute';

import HomePage from './HomePage/HomePage';
import Signup from './LoginSignup/Signup';
import Login from './LoginSignup/Login';
import Password from './LoginSignup/Password';
import ListingsSearchPage from './ListingsPage/ListingsPage';
import ListingShow from './ListingShow/ListingShow';

import BookingPage from './BookingPage/BookingPage';

import NotFoundPage from './NotFoundPage';
import withFooter from './Layout/withFooter';
import App from './HomeListing/App';

const CREATE_PAGES = ['room', 'bedrooms', 'bathrooms', 'location'];

const UPDATE_PAGES = [
  ...CREATE_PAGES,
  'amenities',
  'spaces',
  'photos',
  'description',
  'title',
  'guest_requirements',
  'house_rules',
  'availability',
  'calendar',
  'price',
];

const routes = (
  <Switch>
    <Route path="/bookings" exact component={BookingPage} />
    <Route exact path="/listings" component={ListingsSearchPage} />
    <Route path="/listings/:listingsId(\d+)" component={ListingShow} />
    <Route path="/password" component={withFooter(Password)} />
    <Route path="/login" component={withFooter(Login)} />
    <Route path="/signup" component={withFooter(Signup)} />
    <Route exact path="/" component={HomePage} />
    <Route path="/homelisting" component={App} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default routes;
