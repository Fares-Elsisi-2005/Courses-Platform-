import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase-config";

export function useVideoComments(courseId, videoId) {
  const [comments, setComments] = useState([]);
  const [loadingTheComments, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId || !videoId) return;

    const commentsRef = collection(
      db,
      "courses",
      courseId,
      "videos",
      videoId,
      "comments"
    );

    const q = query(commentsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [courseId, videoId]);
    
   
  return { comments, loadingTheComments };
}