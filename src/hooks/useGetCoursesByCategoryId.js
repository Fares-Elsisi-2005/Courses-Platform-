 import { useState } from "react";
import { db } from "../config/firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  startAfter,
} from "firebase/firestore";

export function useGetCoursesByCategoryId() {
  const [loadingCoursesbyCategory, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore2, setHasMore] = useState(true);

  const getCoursesByMainId = async (mainCategoryId) => {
    try {
      setLoading(true);
      setError(null);

      const coursesRef = collection(db, "courses");

      const q = query(
        coursesRef,
        where("mainCategoryId", "==", mainCategoryId),
        ...(lastDoc ? [startAfter(lastDoc)] : []),
        limit(10)
      );

      const querySnapshot = await getDocs(q);

      const coursesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Save last document for next request
      const lastVisible = querySnapshot.docs.at(-1);
      setLastDoc(lastVisible || null);

      // Check if more data exists
      setHasMore(querySnapshot.docs.length === 10);

      return coursesData;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

   const getCoursesBySubId = async (subCategoryId) => {
    try {
      setLoading(true);
      setError(null);

      const coursesRef = collection(db, "courses");

      const q = query(
        coursesRef,
        where("subCategoryId", "==", subCategoryId),
        ...(lastDoc ? [startAfter(lastDoc)] : []),
        limit(10)
      );

      const querySnapshot = await getDocs(q);

      const coursesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Save last document for next request
      const lastVisible = querySnapshot.docs.at(-1);
      setLastDoc(lastVisible || null);

      // Check if more data exists
      setHasMore(querySnapshot.docs.length === 10);

      return coursesData;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const resetPagination2 = () => {
    setLastDoc(null);
    setHasMore(true);
  };

  return {
    getCoursesByMainId,
    getCoursesBySubId,
    resetPagination2,
    loadingCoursesbyCategory,
    error,
    hasMore2,
  };
}