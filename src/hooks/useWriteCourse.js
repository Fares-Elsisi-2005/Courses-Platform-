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

  // -------------------------------
  // ADD COURSE
  // -------------------------------
  const addCourse = async (courseData) => {
    const docRef = await addDoc(collection(db, "courses"), {
      ...courseData,
      createdAt: serverTimestamp(),
    });

    const userRef = doc(db, "users", courseData.teacherId);

    await updateDoc(userRef, {
      teacherCourses: arrayUnion(docRef.id),
    });

    const snapshot = await getDoc(userRef);
    if (!snapshot.exists()) {
      throw new Error("User document not found after course creation");
    }

    const userData = snapshot.data();

    dispatchUser({
      type: "LOGIN",
      payload: {
        user: { ...userData },
        role: userData.role,
      },
    });

    return docRef.id;
  };

  // -------------------------------
  // EDIT COURSE
  // -------------------------------
  const editCourse = async (courseData) => {
    if (!courseData.id) {
      throw new Error("Course ID is required for editing");
    }

    const courseRef = doc(db, "courses", courseData.id);
 
    await updateDoc(courseRef, { ...courseData,
      updatedAt: serverTimestamp(),
    });

    return courseData.id;
  };


   // -------------------------------
  // DELETE COURSES (MULTI)
  // -------------------------------
  const deleteCourses = async (courseIds, teacherId ) => {
    if (!courseIds?.length) {
      throw new Error("No course IDs provided");
    }
 
    const batch = writeBatch(db);

    // 1️⃣ Delete each course document
    courseIds.forEach((courseId) => {
      const courseRef = doc(db, "courses", courseId);
      batch.delete(courseRef);
    });

    // 2️⃣ Remove course IDs from teacherCourses
    const userRef = doc(db, "users", teacherId);
    batch.update(userRef, {
      teacherCourses: arrayRemove(...courseIds),
    });

    // 3️⃣ Commit batch
    await batch.commit();

    // 4️⃣ Refresh user from Firestore
    const snapshot = await getDoc(userRef);
    if (!snapshot.exists()) {
      throw new Error("User not found after deleting courses");
    }

    const userData = snapshot.data();

    // 5️⃣ Sync AuthContext
    dispatchUser({
      type: "LOGIN",
      payload: {
        user: { ...userData },
        role: userData.role,
      },
    });
    window.location.reload();

    return courseIds;
  };
 
  return { addCourse, editCourse  , deleteCourses,};
}