const reducer = (state, action) => {
  console.log("Backedn Reducer Action Received -> ", action);

  switch (action.type) {
    case "SET_USER":
      localStorage.setItem("AirbnbUser", JSON.stringify(action.payload));
      console.log("Local User Info", localStorage.getItem("AirbnbUser"));
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
      };
    case "LOGOUT":
      localStorage.removeItem("AirbnbUser");
      return {
        ...state,
        user: null,
        loggedIn: false,
      };
    case "SET_LOGGEDIN_STATUS":
      return {
        ...state,
        loggedIn: action.payload,
      };
    case "SET_ISSUES_DATA":
      return {
        ...state,
        issueData: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
