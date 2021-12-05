const reducer = (state, action) => {
  console.log('Backedn Reducer Action Received -> ', action);

  switch (action.type) {
    case 'SET_USER':
      localStorage.setItem('User', JSON.stringify(action.payload));
      console.log('Local User Info', localStorage.getItem('User'));
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_LOGGEDIN_STATUS':
      return {
        ...state,
        loggedIn: action.payload,
      };
    case 'SET_PROPERTY_DATA':
      return {
        ...state,
        propertyData: action.payload,
      };
    case 'SET_CURRENT_PROPERTY':
      return {
        ...state,
        currentProperty: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
