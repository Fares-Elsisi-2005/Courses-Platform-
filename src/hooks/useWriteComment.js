 import { useState } from "react";
import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useAuth } from "../Contexts/AuthContext";

export function useWriteComment(courseId, videoId, teacherId) {
  const { user } = useAuth();

  const [loadingComment, setLoading] = useState(false);
  const [errorComment, setError] = useState(null);

  const clearError = () => setError(null);

  // --------------------------------
  // ADD COMMENT / REPLY
  // --------------------------------
  const addComment = async ({ text, parentId = null }) => {
    if (!text || !courseId || !videoId || !teacherId) return;

    setLoading(true);
    setError(null);

    try {
      const batch = writeBatch(db);

      // 🔹 Create refs
      const videoCommentRef = doc(
        collection(
          db,
          "courses",
          courseId,
          "videos",
          videoId,
          "comments"
        )
      );

      const globalCommentRef = doc(db, "comments", videoCommentRef.id);

      const payload = {
        text,
        parentId,
        courseId,
        videoId,
        teacherId,
        userId: user.user.userId,
        userName: user.user.name,
        userImage: user.user.image || "",
        createdAt: serverTimestamp(),
      };

      // ✅ Write to video subcollection
      batch.set(videoCommentRef, payload);

      // ✅ Write to global collection
      batch.set(globalCommentRef, payload);

      // 🚀 Future (optional counters)
      // batch.update(doc(db, "courses", courseId), {
      //   totalComments: increment(1),
      // });

      await batch.commit();

      return videoCommentRef.id;
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

    setLoading(true);
    setError(null);

    try {
      const batch = writeBatch(db);

      const videoCommentRef = doc(
        db,
        "courses",
        courseId,
        "videos",
        videoId,
        "comments",
        commentId
      );

      const globalCommentRef = doc(db, "comments", commentId);

      const payload = {
        text,
        updatedAt: serverTimestamp(),
      };

      // ✅ Update both places
      batch.update(videoCommentRef, payload);
      batch.update(globalCommentRef, payload);

      await batch.commit();

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
      const batch = writeBatch(db);

      const videoCommentRef = doc(
        db,
        "courses",
        courseId,
        "videos",
        videoId,
        "comments",
        commentId
      );

      const globalCommentRef = doc(db, "comments", commentId);

      // ✅ Delete from both places
      batch.delete(videoCommentRef);
      batch.delete(globalCommentRef);

      // 🚀 Future (optional counters)
      // batch.update(doc(db, "courses", courseId), {
      //   totalComments: increment(-1),
      // });

      await batch.commit();

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