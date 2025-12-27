import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { collection, getDocs, query, where ,documentId,limit } from "firebase/firestore";

// helper to split array into chunks of 10 (Firestore limit)
const chunkArray = (array, size = 10) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export function useGetTeacherCourses(courseIds = []) {
    
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
     

  useEffect(() => {
    
    if (!courseIds || courseIds.length === 0) {
      setCourses([]);
      setLoading(false);
      return;
    }

    const fetchCourses = async () => {
  try {
    setLoading(true);
    const coursesRef = collection(db, "courses");

    // 🔹 Case 1: get first 10 courses (no IDs)
    if (courseIds[0] === "getCourses") {
      const q = query(coursesRef, limit(10));
      const snapshot = await getDocs(q);

      const results = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });

      setCourses(results);
      return;
    }

    // 🔹 Case 2: get courses by IDs
    const chunks = chunkArray(courseIds);
    const results = [];

    for (const chunk of chunks) {
      const q = query(
        coursesRef,
        where(documentId(), "in", chunk)
      );

      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
    }

    setCourses(results);
  } catch (err) {
    console.error(err);
    setError(err);
  } finally {
    setLoading(false);
  }
};

    fetchCourses();
  }, [courseIds]);

  return { courses, loading, error };
}