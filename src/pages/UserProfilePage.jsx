import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../Contexts/AuthContext";
import { useGetUser } from "../hooks/useGetUser";
import ProfileView from "../components/profileView";

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
    return <div>Loading profile...</div>;
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