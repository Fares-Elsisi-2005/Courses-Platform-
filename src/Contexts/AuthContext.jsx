// src/Contexts/AuthContext.jsx
import  { createContext, useReducer, useEffect, useContext } from "react";
import { AuthReducer } from "../Reducers/AuthReducer";

const AuthContext = createContext();
const storageUser = JSON.parse(localStorage.getItem("currentUserData"));
console.log("the value",storageUser)

const initialstate = storageUser?{
  user: storageUser.user||null,
  role: storageUser.role || "guest",
}:{user:null,role:"guest"};
 
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



/* 
context will check if user is has data in the local storate or not 
if not we will set the user to null and role to guest

if it has data in the local storage we will check if the user is in firebase auth
if not we will set the user to null and role to guest

when the user login in we will trigger a despatch function the responsiable for logining in useing google it will return the google data 
we will take what we need from it then we we create new object  we will store it in two places one in local storage and one to the firebase



*/
