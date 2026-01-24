 // src/Hooks/useFirebaseLogin.js
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, Provider } from "../config/firebase-config";

export function useFirebaseLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginWithGoogle = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      await signInWithPopup(auth, Provider);
      // AuthContext will pick up the session
    } catch (err) {
      console.error("Popup login failed:", err);

      // ✅ Retry once automatically (mobile network hiccup fix)
      try {
        console.warn("Retrying popup login...");
        await signInWithPopup(auth, Provider);
      } catch (retryErr) {
        console.error("Retry failed:", retryErr);
        setError("Login failed. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginWithGoogle };
}