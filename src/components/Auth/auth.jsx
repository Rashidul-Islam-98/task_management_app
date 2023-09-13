import React, { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const newState = {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
      localStorage.setItem("authState", JSON.stringify(newState));
      return newState;
    case "LOGOUT":
      localStorage.removeItem("authState");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};


export const AuthProvider = ({ children }) => {
  const storedAuthState = localStorage.getItem("authState");
  const initialState = storedAuthState
    ? JSON.parse(storedAuthState)
    : {
        user: null,
        isAuthenticated: false,
      };

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
