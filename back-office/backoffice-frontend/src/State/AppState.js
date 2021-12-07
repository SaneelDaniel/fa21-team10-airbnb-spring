import React, { useState, useReducer, useContext } from "react";
import AppContext from "./AppContext";
import reducer from "./Reducer";

var userThis = null;
if (typeof window !== "undefined") {
  userThis = JSON.parse(localStorage.getItem("AirbnbUser"));
}
var logIn = false;
if (userThis !== null) {
  logIn = true;
}
const AppState = (props) => {
  const initialState = {
    user: userThis,
    loggedIn: logIn,
    issuesData: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const SET_ISSUES_DATA = (issuesData) => {
    dispatch({
      type: "SET_ISSUES_DATA",
      payload: issuesData,
    });
  };

  //Method to set the User
  const SET_USER = (user) => {
    if (user === null) {
      console.log("User Setting to null: backend action call", user);
    }
    dispatch({
      type: "SET_USER",
      payload: user,
    });
  };

  const LOGOUT = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AppContext.Provider
      value={{
        loggedIn: state.loggedIn,
        user: state.user,
        issuesData: state.issuesData,
        SET_USER: SET_USER,
        SET_ISSUES_DATA: SET_ISSUES_DATA,
        LOGOUT: LOGOUT,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
