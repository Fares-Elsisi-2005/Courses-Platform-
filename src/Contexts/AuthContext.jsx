 
  // src/Contexts/AuthContext.jsx
import { createContext, useReducer, useEffect, useContext, useRef } from "react";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase-config";
import { AuthReducer } from "../Reducers/AuthReducer";

const AuthContext = createContext();

const storageUser = JSON.parse(localStorage.getItem("currentUserData"));

const initialState = storageUser ?? {
  user: null,
  role: "guest",
};

export const AuthProvider = ({ children }) => {
  const [state, dispatchUser] = useReducer(AuthReducer, initialState);
  const redirectHandled = useRef(false); // prevents double execution

  // ✅ Handle Google Redirect Result (Mobile Fix)
  useEffect(() => {
    const handleRedirectLogin = async () => {
      try {
        if (redirectHandled.current) return;

        const result = await getRedirectResult(auth);
        redirectHandled.current = true;

        if (!result?.user) return;

        const firebaseUser = result.user;
        const userRef = doc(db, "users", firebaseUser.uid);
        const snapshot = await getDoc(userRef);

        // Create Firestore user if not exists
        if (!snapshot.exists()) {
          const userData = {
            userId: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            role: "student",
            image: firebaseUser.photoURL,
            enrolledCourses: [],
            savedPlaylists: [],
            likedVideos: [],
            userCommentsId: [],
            createdAt: new Date().toISOString(),
          };

          await setDoc(userRef, userData);
        }
      } catch (error) {
        console.error("Redirect login error:", error);
      }
    };

    handleRedirectLogin();
  }, []);

  // 🔐 Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // ⛔ Not logged in
      if (!firebaseUser) {
        dispatchUser({ type: "LOGOUT" });
        return;
      }

      try {
        const userRef = doc(db, "users", firebaseUser.uid);
        const snapshot = await getDoc(userRef);

        // ⛔ Firestore user missing (wait instead of logout)
        if (!snapshot.exists()) {
          console.warn("Firestore user not ready yet, waiting...");
          return;
        }

        const userData = snapshot.data();

        dispatchUser({
          type: "LOGIN",
          payload: {
            user: {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...userData,
            },
            role: userData.role || "student",
          },
        });

      } catch (error) {
        console.error("Auth check failed:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  // 💾 Sync to localStorage
  useEffect(() => {
    localStorage.setItem("currentUserData", JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider value={{ user: state, dispatchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);