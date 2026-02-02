import {useUserComments} from "../hooks/useUserComments";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useAuth } from "../Contexts/AuthContext";
import UserComments from "../components/UserComments";


const UserCommentsPage = () => {

    const { user } = useAuth();
    const { getCommentsByUserId, hasMoreComments, loading, errorComments } = useUserComments(user?.user?.userId);

    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const commentsData = await getCommentsByUserId();
            setComments(commentsData);
        };

        fetchComments();
    }, []);

    if (loading) return <Box>Loading...</Box>;

    
    if (errorComments) return <Box>Error:  {
        errorComments}</Box>;

        
    return  (
    <Box>
         
        <UserComments data={comments}  loading={loading} error={errorComments}  />
    </Box>)
}


export default UserCommentsPage;