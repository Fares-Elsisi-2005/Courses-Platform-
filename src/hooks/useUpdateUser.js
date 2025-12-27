 import { serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useAuth } from "../Contexts/AuthContext";

export function useUpdateUser() {
       const { dispatchUser } = useAuth();

  // -------------------------------
  // UPDATE USER DATA
  // -------------------------------
    const updateUserData = async (userData) => {
 
        console.log("user data from update user hook", userData)
    if (!userData.userId) {
      throw new Error("User ID is required for updating user data");
    }

    const userRef = doc(db, "users", userData.userId);

    await updateDoc(userRef, {
      ...userData,              // ✅ only actual user fields
      updatedAt: serverTimestamp(),
    });
      
      
    // Finally update context
    dispatchUser({
      type: "LOGIN",
      payload: {
        user: userData,
        role: userData.role,
       
      },
    });

    return userData.userId;
  };

  return { updateUserData };
}