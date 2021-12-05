import React, { useState, useReducer, useContext } from 'react';
import AppContext from './AppContext';
import reducer from './Reducer';

var userThis = null;
if (typeof window !== 'undefined') {
  userThis = JSON.parse(localStorage.getItem('User'));
}
var logIn = false;
if (userThis !== null) {
  logIn = true;
}
const AppState = (props) => {
  const initialState = {
    user: userThis,
    loggedIn: logIn,
    propertyData: [],
    currentProperty: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const SET_PROPERTY_DATA = (propertyData) => {
    dispatch({
      type: 'SET_PROPERTY_DATA',
      payload: propertyData,
    });
  };

  const SET_CURRENT_PROPERTY = (currentProperty) => {
    dispatch({
      type: 'SET_CURRENT_PROPERTY',
      payload: currentProperty,
    });
  };

  //Method to set the User
  const SET_USER = (user) => {
    if (user === null) {
      console.log('User Setting to null: backend action call', user);
    }
    dispatch({
      type: 'SET_USER',
      payload: user,
    });
  };

  return (
    <AppContext.Provider
      value={{
        loggedIn: state.loggedIn,
        user: state.user,
        propertyData: state.propertyData,
        currentProperty: state.currentProperty,
        SET_USER: SET_USER,
        SET_PROPERTY_DATA: SET_PROPERTY_DATA,
        SET_CURRENT_PROPERTY: SET_CURRENT_PROPERTY,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
