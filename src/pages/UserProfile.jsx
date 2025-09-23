
import { useTheme, Box, Button, Typography, Divider, Avatar } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
const UserProfile = () => {
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const navigate = useNavigate();
     
     return (
          <Box>
               <Typography variant="h3">Profile Details</Typography>
               <Divider sx={{ mt: "15px", mb: "25px" }} />
               <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} sx={{backgroundColor:colors.primary[200],borderRadius:"8px",p:"20px"}}>
                    <Box display={"flex"} flexDirection={"column"} marginBottom={"20px"} gap={"10px"} textAlign={"center"}  >
                         <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg" sx={{ width: 56, height: 56,alignSelf:"center" }}  /> 
                         <Box>
                              <Typography variant="h5">Ardit korko</Typography>
                              <Typography variant="h6" sx={{ color: colors.primary[300], }}>developer</Typography>
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
                              <Typography variant="h4" sx={{ color: colors.grey[400] }} >View Playlists: <span style={{ color: colors.purple[500], fontWeight: "bold", fontSize: "20px",display:"block" }}>3</span></Typography>
                             </Box>
                              <Button variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100], margin:"20px 0"  }}>Our Courses</Button>
                              
                         </Box>
                         
                         <Box backgroundColor={colors.primary[100]} p={"20px"} borderRadius={"7px"}  >
                              <Box display={"flex"}>
                                    <FavoriteIcon sx={{fontSize:"50px",p:"10px", backgroundColor:colors.primary[300],color:colors.primary[200],borderRadius:"8px",mr:"20px"}}/>
                              <Typography variant="h4" sx={{ color: colors.grey[400] }} >View Liked: <span style={{ color: colors.purple[500], fontWeight: "bold", fontSize: "20px",display:"block" }}>3</span></Typography>
                             </Box>
                              <Button variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100], margin:"20px 0"  }}>Our Courses</Button>
                              
                         </Box>
                         
                         <Box backgroundColor={colors.primary[100]} p={"20px"} borderRadius={"7px"}  >
                              <Box display={"flex"}>
                                    <ModeCommentIcon sx={{fontSize:"50px",p:"10px", backgroundColor:colors.primary[300],color:colors.primary[200],borderRadius:"8px",mr:"20px"}}/>
                              <Typography variant="h4" sx={{ color: colors.grey[400] }} >videos comments: <span style={{ color: colors.purple[500], fontWeight: "bold", fontSize: "20px",display:"block" }}>3</span></Typography>
                             </Box>
                              <Button variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100], margin:"20px 0"  }}>Our Courses</Button>
                              
                         </Box>
                         
                        
                          

                    </Box>
                    
               </Box>
          
          </Box>
     )
}
 

export default UserProfile;