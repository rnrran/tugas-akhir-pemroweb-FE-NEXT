// src/context/AuthReducer.js
const AuthReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          currentUser: action.payload,
          userToken: action.payload.token,  // Menyimpan token dalam state
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
  
  export default AuthReducer;  // Pastikan diekspor dengan default
  