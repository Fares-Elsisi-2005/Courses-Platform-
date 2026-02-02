import { useState, useCallback, useEffect } from "react";
import {
collection,
query,
getDocs,
where,
orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase-config";



export function useUserCommentsCounts(userId) {
const [loadingCommentsCounts, setLoading] = useState(false);
const [errorComments, setError] = useState(null);
 
 

const getCommentsByUserId = useCallback(async () => {
if (!userId ) return [];


try {
    setLoading(true);
    setError(null);


    const commentsRef = collection(db, "comments");


    const q = query(
        commentsRef,
        where("userId", "==", userId),
        where("parentId", "==", null),
      
        
    );


    const querySnapshot = await getDocs(q);


    const commentsData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    }));



     

return commentsData;
} catch (err) {
    setError(err.message);
    return [];
} finally {
    setLoading(false);
}
}, [userId ]);


return {
    getCommentsByUserId,
    loadingCommentsCounts,
    errorComments,
};
}