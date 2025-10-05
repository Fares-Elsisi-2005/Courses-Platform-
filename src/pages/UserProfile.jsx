
import { useTheme, Box, Button, Typography, Divider, Avatar } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { getuserByid } from "./../services/serviceProvider";
import { useAppData } from "../Contexts/AppContext";

 

const UserProfile = () => {
      const { state } = useAppData();
     const { users ,currentUser} = state;
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const navigate = useNavigate();
     let userData = getuserByid(users,currentUser.userId);

     /* 
     {
    userId: "u_1002",
    name: "Fares Ahmed",
    email: "fares@gmail.com",
    role: "student",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    enrolledCourses: ["c_2001" ],
    createdAt: "2025-08-21T12:30:00Z",
    savedPlaylits: ["c_2001"],
    likedCourses: ["c_2001"],
    likedVideos: ["v_3002", "v_3003"],
    userCommentsId:["c_2001_cm1","c_2001_cm2"]
    
  }
      */
     
     return (
          <Box>
               <Typography variant="h3">Profile Details</Typography>
               <Divider sx={{ mt: "15px", mb: "25px" }} />
               <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} sx={{backgroundColor:colors.primary[200],borderRadius:"8px",p:"20px"}}>
                    <Box display={"flex"} flexDirection={"column"} marginBottom={"20px"} gap={"10px"} textAlign={"center"}  >
                         <Avatar alt="Ardit korko" src= {userData.image} sx={{ width: 56, height: 56,alignSelf:"center" }}  /> 
                         <Box>
                              <Typography variant="h5">{ userData.name}</Typography>
                              <Typography variant="h6" sx={{ color: colors.primary[300], }}>{userData.role}</Typography>
                              <Button onClick={()=>{navigate("/UserProfileUpdate")}} variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100], margin:"20px 0"  }}>Update Profile</Button>
                              
                         </Box>
                    </Box>
                    <Box display="grid"
                         width={"100%"}
                          
                         gap={2} // spacing between cards
                         sx={{
                         gridTemplateColumns: {
                              
                              sm: "1fr", // tablet → 3 cards
                              md: "repeat(3, 1fr)", // desktop → 4 cards
                         },
                         }}>
                         
                         <Box backgroundColor={colors.primary[100]} p={"20px"} borderRadius={"7px"}  >
                              <Box display={"flex"}>
                                    <BookmarkIcon sx={{fontSize:"50px",p:"10px", backgroundColor:colors.primary[300],color:colors.primary[200],borderRadius:"8px",mr:"20px"}}/>
                                   <Typography variant="h4" sx={{ color: colors.grey[400] }} >Saved Playlists: <span style={{ color: colors.purple[500], fontWeight: "bold", fontSize: "20px", display: "block" }}>{ userData.savedPlaylits.length}</span></Typography>
                             </Box>
                              <Button variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100], margin:"20px 0"  }}>view saved playlists</Button>
                              
                         </Box>
                         
                        
                         <Box backgroundColor={colors.primary[100]} p={"20px"} borderRadius={"7px"}  >
                              <Box display={"flex"}>
                                    <FavoriteIcon sx={{fontSize:"50px",p:"10px", backgroundColor:colors.primary[300],color:colors.primary[200],borderRadius:"8px",mr:"20px"}}/>
                                   <Typography variant="h4" sx={{ color: colors.grey[400] }} >Liked Videos: <span style={{ color: colors.purple[500], fontWeight: "bold", fontSize: "20px", display: "block" }}>{userData.likedVideos.length}</span></Typography>
                             </Box>
                              <Button variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100], margin:"20px 0"  }}>View Liked Vidoes</Button>
                              
                         </Box>
                         
                         <Box backgroundColor={colors.primary[100]} p={"20px"} borderRadius={"7px"}  >
                              <Box display={"flex"}>
                                    <ModeCommentIcon sx={{fontSize:"50px",p:"10px", backgroundColor:colors.primary[300],color:colors.primary[200],borderRadius:"8px",mr:"20px"}}/>
                                   <Typography variant="h4" sx={{ color: colors.grey[400] }} >your comments: <span style={{ color: colors.purple[500], fontWeight: "bold", fontSize: "20px", display: "block" }}>{userData.userCommentsId.length}</span></Typography>
                             </Box>
                              <Button variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100], margin:"20px 0"  }}>View Comments</Button>
                              
                         </Box>
                         
                        
                          

                    </Box>
                    
               </Box>
          
          </Box>
     )
}
 

export default UserProfile;