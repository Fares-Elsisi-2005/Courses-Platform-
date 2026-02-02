import { useState, useCallback, useEffect } from "react";
import {
collection,
query,
getDocs,
where,
limit,
startAfter,
orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase-config";


export function useUserComments(userId) {
const [loading, setLoading] = useState(false);
const [errorComments, setError] = useState(null);
const [lastComments, setLastComments] = useState(null);
const [hasMoreComments, setHasMoreComments] = useState(true);


// Reset pagination when user changes
useEffect(() => {
setLastComments(null);
setHasMoreComments(true);
}, [userId]);


const getCommentsByUserId = useCallback(async () => {
if (!userId || !hasMoreComments) return [];


try {
setLoading(true);
setError(null);


const commentsRef = collection(db, "comments");


const q = query(
commentsRef,
where("userId", "==", userId),
where("parentId", "==", null),
orderBy("createdAt", "desc"),  
...(lastComments ? [startAfter(lastComments)] : []),
limit(10)
);


const querySnapshot = await getDocs(q);


const commentsData = querySnapshot.docs.map((doc) => ({
id: doc.id,
...doc.data(),
}));


const lastVisible = querySnapshot.docs.at(-1);
setLastComments(lastVisible || null);
setHasMoreComments(querySnapshot.docs.length === 10);


return commentsData;
} catch (err) {
setError(err.message);
return [];
} finally {
setLoading(false);
}
}, [userId, lastComments, hasMoreComments]);


return {
getCommentsByUserId,
hasMoreComments,
loading,
errorComments,
};
}