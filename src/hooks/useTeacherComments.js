  


import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase-config";

export function useTeacherComments({ teacherId, mode = "list" }) {
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(0);
 const [loadingComments, setLoading] = useState(true);
  const [errorComments, setError] = useState(null);


  useEffect(() => {
    if (!teacherId) return;

    setLoading(true);
    setError(null);

    const constraints = [
      collection(db, "comments"),
      where("teacherId", "==", teacherId),
      orderBy("createdAt", "desc"),
    ];

    // ✅ Only count top-level comments
    if (mode === "count") {
      constraints.splice(
        1,
        0,
        where("parentId", "==", null)
      );
    }

    const q = query(...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (mode === "count") {
          setCount(snapshot.size);
        }

        if (mode === "list") {
          const list = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setComments(list);
        }

        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("Failed to load comments");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [teacherId, mode]);

  return {
    comments,
    count,
    loadingComments,
    errorComments,
  };
}