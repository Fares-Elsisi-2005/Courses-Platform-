import { useState } from "react";
import { signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, Provider, db } from "../config/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../Contexts/AuthContext";

export function useFirebaseLogin() {
  const { dispatchUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);

    try {
      let result;

      // 1️⃣ Try popup first
      try {
        result = await signInWithPopup(auth, Provider);
      } catch (popupError) {
        console.warn("Popup login failed, falling back to redirect:", popupError.message);

        // 2️⃣ If popup fails, fallback to redirect
        await signInWithRedirect(auth, Provider);

        // 3️⃣ Wait for redirect result when page reloads
        result = await getRedirectResult(auth);

        if (!result) {
          throw new Error("Redirect login did not complete. Try again.");
        }
      }

      const user = result.user;

      // 4️⃣ Fetch or create user in Firestore
      const userRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(userRef);
      let userData;

      if (snapshot.exists()) {
        userData = snapshot.data();
      } else {
        userData = {
          userId: user.uid,
          name: user.displayName,
          email: user.email,
          role: "student",
          image: user.photoURL,
          enrolledCourses: [],
          savedPlaylists: [],
          likedVideos: [],
          userCommentsId: [],
          createdAt: new Date().toISOString(),
          token: user.accessToken,
        };
        await setDoc(userRef, userData);
      }

      // 5️⃣ Update context
      dispatchUser({ type: "LOGIN", payload: { user: userData, role: userData.role } });
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginWithGoogle };
}