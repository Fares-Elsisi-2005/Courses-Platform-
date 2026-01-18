import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Stack,Box  } from "@mui/material";

import Skeleton from '@mui/material/Skeleton';

import { useAuth } from "../Contexts/AuthContext";
import { useGetUser } from "../hooks/useGetUser";
import ProfileView from "../components/profileView";




const Variants=() =>{
  return (
    <Stack flexGrow={1} spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" flexGrow={1}sx={{minWidth:"210px"}} height={60} />
      <Skeleton variant="rounded"flexGrow={1}sx={{minWidth:"210px"}}   height={60} />
    </Stack>
  );
}

const UserProfileProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  // 🔹 real async data handling
  const { userData: requestedUser, loading } = useGetUser(id);

  const isOwnProfile = id === user?.user?.userId;
  const isAdmin = user?.role === "admin";
 
  // 🔹 redirect ONLY after data is resolved
  useEffect(() => {
    if (!loading && !requestedUser) {
      navigate("/not-found", { replace: true });
    }
  }, [loading, requestedUser, navigate]);

  // 🔹 loading state
  if (loading) {
    return <Box display={"flex"} gap={"20px"}  flexWrap={"wrap"}><Variants /><Variants /><Variants /></Box>;
  }

  // 🔹 safety fallback (should not happen)
  if (!requestedUser) return null;
  
  return (
    <ProfileView
      profileUser={requestedUser}
      currentUser={user}
      isOwnProfile={isOwnProfile}
      isAdmin={isAdmin}
    />
      
  );
};

export default UserProfileProfile;