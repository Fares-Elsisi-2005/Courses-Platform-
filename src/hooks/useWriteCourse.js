 import { useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  writeBatch,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useAuth } from "../Contexts/AuthContext";

export function useWriteCourse() {
  const { dispatchUser } = useAuth();

  const [writeCourseLoading, setWriteCourseLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = () => setError(null);

  // -------------------------------
  // ADD COURSE
  // -------------------------------
  const addCourse = async (courseData) => {
    setWriteCourseLoading(true);
    setError(null);

    try {
      // Add course document
      const docRef = await addDoc(collection(db, "courses"), {
        ...courseData,
        createdAt: serverTimestamp(),
      });

      // Update teacher's courses
      const userRef = doc(db, "users", courseData.teacherId);
      await updateDoc(userRef, {
        teacherCourses: arrayUnion(docRef.id),
      });

      // Refresh user data
      const snapshot = await getDoc(userRef);
      if (!snapshot.exists()) {
        throw new Error("User document not found after course creation");
      }

      const userData = snapshot.data();
      dispatchUser({
        type: "LOGIN",
        payload: { user: { ...userData }, role: userData.role },
      });

      return docRef.id;
    } catch (err) {
      setError(err.message || "Failed to add course");
      throw err;
    } finally {
      setWriteCourseLoading(false);
    }
  };

  // -------------------------------
  // EDIT COURSE
  // -------------------------------
  const editCourse = async (courseData) => {
    if (!courseData.id) {
      const err = new Error("Course ID is required for editing");
      setError(err.message);
      throw err;
    }

    setWriteCourseLoading(true);
    setError(null);

    try {
      const courseRef = doc(db, "courses", courseData.id);
      await updateDoc(courseRef, {
        ...courseData,
        updatedAt: serverTimestamp(),
      });

      return courseData.id;
    } catch (err) {
      setError(err.message || "Failed to edit course");
      throw err;
    } finally {
      setWriteCourseLoading(false);
    }
  };

  // -------------------------------
  // DELETE COURSES (MULTI)
  // -------------------------------
  const deleteCourses = async (courseIds, teacherId) => {
    if (!courseIds?.length) {
      const err = new Error("No course IDs provided");
      setError(err.message);
      throw err;
    }

    setWriteCourseLoading(true);
    setError(null);

    try {
      const batch = writeBatch(db);

      // 1️⃣ Delete courses
      courseIds.forEach((courseId) => {
        const courseRef = doc(db, "courses", courseId);
        batch.delete(courseRef);
      });

      // 2️⃣ Remove from teacherCourses
      const userRef = doc(db, "users", teacherId);
      batch.update(userRef, { teacherCourses: arrayRemove(...courseIds) });

      // 3️⃣ Commit batch
      await batch.commit();

      // 4️⃣ Refresh user
      const snapshot = await getDoc(userRef);
      if (!snapshot.exists()) {
        throw new Error("User not found after deleting courses");
      }

      const userData = snapshot.data();
      dispatchUser({
        type: "LOGIN",
        payload: { user: { ...userData }, role: userData.role },
      });

      return courseIds;
    } catch (err) {
      setError(err.message || "Failed to delete courses");
      throw err;
    } finally {
      setWriteCourseLoading(false);
    }
  };

  return {
    addCourse,
    editCourse,
    deleteCourses,
    writeCourseLoading,
    error,
    clearError,
  };
}