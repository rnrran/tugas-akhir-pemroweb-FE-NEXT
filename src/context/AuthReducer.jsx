const AuthReducer = (state, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          currentUser: action.payload,
        };
      case 'LOGOUT':
        return {
          currentUser: null,
          userToken: null,
        };
      default:
        return state;
    }
  };
  
  export default AuthReducer;
  