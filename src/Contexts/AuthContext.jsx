// src/Contexts/AuthContext.jsx
import  { createContext, useReducer, useEffect, useContext } from "react";
import { AuthReducer } from "../Reducers/AuthReducer";

const AuthContext = createContext();
const storageUser = JSON.parse(localStorage.getItem("currentUserData"));

const initialstate = {
  user: storageUser.user||null,
  role: storageUser.role || "guest",
};

export const AuthProvider = ({ children }) => {
  const [user, dispatchUser] = useReducer(AuthReducer, initialstate);

  useEffect(() => {
    localStorage.setItem("currentUserData",JSON.stringify( user));
  }, [user]);
 
  return (
    <AuthContext.Provider value={{ user, dispatchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
