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
 
 export function useGetusersByRole() {
   const [loadingTeachers, setLoadingTeachers] = useState(false);
   const [error, setError] = useState(null);
   const [lastDoc, setLastDoc] = useState(null);
   const [hasMore, setHasMore] = useState(true);
 
   const getAllTeachers = async (role) => {
     try {
       setLoadingTeachers(true);
       setError(null);
 
       const usersRef = collection(db, "users");
 
       const q = query(
         usersRef,
         where("role", "==", role),
         ...(lastDoc ? [startAfter(lastDoc)] : []),
         limit(8)
       );
 
       const querySnapshot = await getDocs(q);
 
       const usersData = querySnapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
       }));
 
       // Save last document for next request
       const lastVisible = querySnapshot.docs.at(-1);
       setLastDoc(lastVisible || null);
 
       // Check if more data exists
       setHasMore(querySnapshot.docs.length === 10);
 
       return usersData;
     } catch (err) {
       setError(err.message);
       return [];
     } finally {
       setLoadingTeachers(false);
     }
   };
 
    
 
   const resetPagination = () => {
     setLastDoc(null);
     setHasMore(true);
   };
 
   return {
     getAllTeachers,
     resetPagination,
     loadingTeachers,
     error,
     hasMore,
   };
 }