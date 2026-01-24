import { useState } from "react";
import { db } from "../config/firebase-config";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";

export function useGetAllCourses() {
  const [loading2, setLoading] = useState(false);
  const [error2, setError] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const getCourses = async () => {
    try {
      console.log("Fetching courses from Firestore");
      setLoading(true);
      setError(null);

      const coursesRef = collection(db, "courses");

      const q = query(
        coursesRef,
        orderBy("createdAt", "desc"),
        ...(lastDoc ? [startAfter(lastDoc)] : []),
        limit(8)
      );

      const snapshot = await getDocs(q);

      const courses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const lastVisible = snapshot.docs.at(-1);
      setLastDoc(lastVisible || null);

      setHasMore(snapshot.docs.length === 8);

      return courses;
    } catch (err) {
      console.log("Error fetching courses:", err);
      setError(err.message);
      console.log(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const resetPagination = () => {
    setLastDoc(null);
    setHasMore(true);
  };

  return {
    getCourses,
    resetPagination,
    loading2,
    error2,
    hasMore,
  };
}