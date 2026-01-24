 import { useState } from "react";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, Provider } from "../config/firebase-config";

const isMobile = () =>
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export function useFirebaseLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);

    try {
      if (isMobile()) {
        await signInWithRedirect(auth, Provider);
        return;
      }

      await signInWithPopup(auth, Provider);

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginWithGoogle };
}