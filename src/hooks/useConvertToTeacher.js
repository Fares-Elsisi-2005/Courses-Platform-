 import { db } from "../config/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../Contexts/AuthContext";
import { useState } from "react";

export function useConvertToTeacher() {
  const { user, dispatchUser } = useAuth();
  const [convertionLoding, setConvertionLoading] = useState(false);
  const [isTeacher, setIsTeacher]= useState( user?.role === "teacher")

  
  const convertToTeacher = async () => {
    setConvertionLoading(true);
    const userRef = doc(db, "users", user.user.userId);
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.data();
      console.log("User data to be converted in firebase:", userData);

      const newUserData = {
        ...userData,
        role: "teacher",
        teacherCourses: [],
      };

      console.log("Converted user:", newUserData);

      // ✅ CORRECT UPDATE
      await updateDoc(userRef, newUserData);

      dispatchUser({
        type: "LOGIN",
        payload: {
          user: newUserData,
          role: newUserData.role,
        },
      });

      setConvertionLoading(false);
      setIsTeacher(true);
    } else {
      console.log("User not found");

      dispatchUser({
        type: "LOGOUT",
      });
      setConvertionLoading(false);

    }
  };

  return { convertToTeacher, convertionLoding,isTeacher };
}
/* 
take the current user id
search it in the firebase database 
if not found  log out him and redercit it to login page
if found update the role of the user to teacher
*/