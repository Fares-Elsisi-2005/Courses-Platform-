import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { collection, getDocs, query } from "firebase/firestore";

export function useCourseSearchIndex() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIndex = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "courses"));
        const snap = await getDocs(q);

        const data = snap.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
        }));

        setCourses(data);
      } catch (e) {
        console.error("Search index error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchIndex();
  }, []);

  return { courses, loading };
}