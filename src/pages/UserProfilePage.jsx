import { Box,Button ,Typography,Divider,Avatar  } from "@mui/material";
 
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { useParams } from "react-router-dom";
import { getuserByid } from "../services/serviceProvider";
import { useAppData } from "../Contexts/AppContext";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";


import ProfileView from "../components/profileView";



const UserProfileProfile = () => {


     const navigate = useNavigate();

    
     const { state } = useAppData(); 
     const { users } = state; // app data

     const { user } = useAuth(); // current user
     
     const { id } = useParams();
     

     let requestedUserdata = getuserByid(users, id);// profile user data
    
  
     const isOwnProfile = id === user?.user?.userId
     const isAdmin = user?.role == "admin"

    
   
     if (!requestedUserdata) {
          console.log("jpjfpjsadf")
          navigate("/not-found") // incorrect path so it redirect by default for the unknow paths to the not found component
     } else {
          return (
            <ProfileView profileUser={ requestedUserdata} currentUser={user} isOwnProfile={isOwnProfile} isAdmin={isAdmin} />
 
     )
     }
    
     
}
 

export default UserProfileProfile;