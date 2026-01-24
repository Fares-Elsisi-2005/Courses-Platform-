  // src/Contexts/AuthContext.jsx
import { createContext, useReducer, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
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

  // 🔐 Firebase Auth Listener (Single Source of Truth)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        dispatchUser({ type: "LOGOUT" });
        return;
      }

      try {
        const userRef = doc(db, "users", firebaseUser.uid);
        const snapshot = await getDoc(userRef);

        let userData;

        // ✅ Create user if not exists (important for redirect timing)
        if (!snapshot.exists()) {
          userData = {
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
        } else {
          userData = snapshot.data();
        }

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
        console.error("Auth error:", error);
        dispatchUser({ type: "LOGOUT" });
      }
    });

    return () => unsubscribe();
  }, []);

  // 💾 Persist session
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