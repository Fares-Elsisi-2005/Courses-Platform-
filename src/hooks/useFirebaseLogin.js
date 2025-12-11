import { signInWithPopup } from "firebase/auth";
import { auth, Provider, db } from "../config/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../Contexts/AuthContext";

export function useFirebaseLogin() {
  const { dispatchUser } = useAuth();

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, Provider);
      const user = result.user;
      
      

    const userRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(userRef);

    let userData;

    if (snapshot.exists()) {
      // user already exists in Firestore
        userData = snapshot.data();
        console.log("user is indeed in firebase: " , userData)
    } 
    else {
      // Create new user document
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
        token:user.accessToken
        };
        
        console.log("new user is created", userData)

        

      await setDoc(userRef, userData);
    }

    // Finally update context
    dispatchUser({
      type: "LOGIN",
      payload: {
        user: userData,
        role: userData.role,
       
      },
    });
      
        
  };

  return { loginWithGoogle };
}

 