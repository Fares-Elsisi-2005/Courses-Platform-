import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { collection, getDocs, query } from "firebase/firestore";

export function useTeacherUserSearchIndex() {
  const [ Teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIndex = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "users"));
        const snap = await getDocs(q);

        const data = snap.docs.filter(doc => doc.data().role === "teacher").map(doc => ({
          id: doc.data().userId,
            name: doc.data().name,
          image: doc.data().image,
        }));

        setTeachers(data);
      } catch (e) {
        console.error("Search index error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchIndex();
  }, []);

  return { Teachers, loading };
}