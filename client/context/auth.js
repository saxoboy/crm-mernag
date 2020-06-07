import React, { useEffect, useReducer, createContext } from "react";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

const AuthContext = createContext({
  user: null,
  login: (token) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const router = useRouter(); // Routing
  const [state, dispatch] = useReducer(authReducer, initialState);
 
  function login(token) {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    dispatch({
      type: "LOGIN",
      payload: decodedToken
    });
    router.push("/");
  }

  function logout() {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    router.push("/login");
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const decodedToken = jwtDecode(localStorage.getItem("token"));
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        console.log("session expirada");
        logout()
      } else {
        initialState.user = decodedToken;  
      }
    }
  }),[]
  
  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />
  );
}

export { AuthContext, AuthProvider };
