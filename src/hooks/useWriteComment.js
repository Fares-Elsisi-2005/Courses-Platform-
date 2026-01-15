import { useState } from "react";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useAuth } from "../Contexts/AuthContext";

export function useWriteComment(courseId, videoId) {
  const { user } = useAuth();

  const [loadingComment, setLoading] = useState(false);
  const [errorComment, setError] = useState(null);

  const clearError = () => setError(null);

  // --------------------------------
  // ADD COMMENT / REPLY
  // --------------------------------
    const addComment = async ({ text, parentId = null }) => {
     
    if (!text) return;

    setLoading(true);
    setError(null);

    try {
      const commentsRef = collection(
        db,
        "courses",
        courseId,
        "videos",
        videoId,
        "comments"
      );

      const docRef = await addDoc(commentsRef, {
        text,
        parentId,
        userId: user.user.userId,
        userName: user.user.name,
        userImage: user.user.image || "",
        createdAt: serverTimestamp(),
      });

      return docRef.id;
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to add comment");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // EDIT COMMENT
  // --------------------------------
  const editComment = async (commentId, text) => {
    if (!commentId || !text) return;

      console.log("commentId to update", commentId)
      console.log("text to update", text)
    setLoading(true);
    setError(null);

    try {
      const commentRef = doc(
        db,
        "courses",
        courseId,
        "videos",
        videoId,
        "comments",
        commentId
      );

      await updateDoc(commentRef, {
        text,
        updatedAt: serverTimestamp(),
      });

      return commentId;
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to edit comment");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // DELETE COMMENT
  // --------------------------------
  const deleteComment = async (commentId) => {
    if (!commentId) return;

    setLoading(true);
    setError(null);

    try {
      const commentRef = doc(
        db,
        "courses",
        courseId,
        "videos",
        videoId,
        "comments",
        commentId
      );

      await deleteDoc(commentRef);
      return commentId;
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to delete comment");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    addComment,
    editComment,
    deleteComment,
    loadingComment,
    errorComment,
    clearError,
  };
}