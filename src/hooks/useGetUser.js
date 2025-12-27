import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { doc, getDoc } from "firebase/firestore";
 
  

export function useGetUser(userId) {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    if (!userId) return;

    

    const fetchUser = async () => {
      const userRef = doc(db, "users", userId);
      const snapshot = await getDoc(userRef);
      const userData = snapshot.data();
     
     
          


      setUserData(snapshot.exists() ? userData : null);
      setLoading(false);
    };



    fetchUser();
  }, [userId]);

  return { userData, loading  };
}
