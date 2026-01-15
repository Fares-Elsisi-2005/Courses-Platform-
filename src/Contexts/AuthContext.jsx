 
   
// src/Contexts/AuthContext.jsx
import { createContext, useReducer, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase-config";
import { AuthReducer } from "../Reducers/AuthReducer";
 

const AuthContext = createContext();

const storageUser = JSON.parse(localStorage.getItem("currentUserData"));

const initialState = storageUser ?? {
  user: null,
  role: "guest",
};

export const AuthProvider = ({ children }) => {
  const [user, dispatchUser] = useReducer(AuthReducer, initialState);

  // 🔐 Check Firebase Auth + Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Not logged in
      if (!firebaseUser) {
        dispatchUser({ type: "LOGOUT" });
         
        return;
      }

      try {
        const userRef = doc(db, "users", firebaseUser.uid);
        const snapshot = await getDoc(userRef);

        // User NOT found in Firestore
        if (!snapshot.exists()) {
          dispatchUser({ type: "LOGOUT" });
            
          return;
        }

        // User exists
        const userData = snapshot.data();
        console.log("the user data that we got from the firestore: ",userData)

        dispatchUser({
          type: "LOGIN",
          payload: {
            user: {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...userData,
            },
            role: userData.role || "user",
          },
        });

      } catch (error) {
        console.error("Auth check failed:", error);
        dispatchUser({ type: "LOGOUT" });
         
      }
    });

    return () => unsubscribe();
  }, []);

  // 💾 Sync to localStorage
  useEffect(() => {
    localStorage.setItem("currentUserData", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{  user, dispatchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
 
 