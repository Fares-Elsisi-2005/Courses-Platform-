 import { useTheme, Box, Typography, Divider, Chip, Stack, Button } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import { tokens } from "../theme";
import { useEffect, useRef } from "react";
import { useNavigate  } from "react-router-dom";
import {formatTimestamp,  getimageUrl } from "./../services/serviceProvider";
  
import { useAuth } from "../Contexts/AuthContext";
import { useGetTeacherCourses } from "../hooks/useGetCoursesById";
import { useGetUser } from "../hooks/useGetUser";



const CardHeader = ({ userId, courseData }) => {
            
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
      
     

     const { userData, loading } = useGetUser(userId);
     if(loading) return <Box>Loading...</Box>
 
     return(
           <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
               <Avatar alt="Ardit korko" src= {userData.image} /> 
               <Box>
                    <Typography variant="h5">{getimageUrl( userData.name)}</Typography>
                    <Typography variant="h6" sx={{ color: colors.primary[300], }}> {formatTimestamp( courseData.createdAt)}</Typography>

               </Box>
          </Box>
     )
}


const SavedPlaylits = () => {
     const { user } = useAuth();  
      

     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const divider = useRef(null); 
     const navigate = useNavigate();
     const { courses, loading, error } = useGetTeacherCourses(user?.user?.savedPlaylists);

     useEffect(() => {
          divider.current?.scrollIntoView();
     }, []); 

     // --------------------------------------------------
     // Loading guard (edit mode only)
     // --------------------------------------------------

     if (loading) {
               return <Typography>Loading course...</Typography>;
     } 
     
    

    return ( 
         <>
            {
                user?.user?.savedPlaylists.length > 0 ?
                     <Box>
               <Typography variant="h3">Saved Playlists</Typography>
               <Divider ref={divider} sx={{ margin: "15px 0px" }} />
               
               <Box display="grid" gap={2}
                    sx={{
                         gridTemplateColumns: {
                              xs: "1fr",       // mobile  
                              sm: "1fr 1fr",   // tablet  
                              md:"1fr 1fr 1fr",
                              lg: "1fr 1fr 1fr", // desktop 
                         },
                    }}>
                    {
                     courses.map((courseData) => {
                          

                         return(<Card key={courseData.id} sx={{ maxWidth: "100%", display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
                                   <CardContent>
                                        <CardHeader userId={courseData.teacherId } courseData={courseData } />

                                        <Box position={"relative"}>
                                             <CardMedia
                                                  sx={{ height: 260 }}
                                                  image={getimageUrl(courseData.image)}
                                                  title={courseData.title}
                                             />
                                             <Box sx={{
                                                  width: "fit-content",
                                                  padding: "6px",
                                                  borderRadius: "5px",
                                                  backgroundColor: "#000000ac",
                                                  color: "#fff",
                                                  position: "absolute",
                                                  top: "10px",
                                                  left:"10px"
                                             }}>
                                                  <Typography variant="h6">{`${courseData.playlist.length} videos`}</Typography>
                                             </Box>
                                        </Box>

                                        <Typography variant="h5" component="div" mt={"10px"}>
                                             {courseData.title}
                                        </Typography>
                                   </CardContent>
                                   <CardActions>
                                        <Button onClick={()=>{navigate(`/Course/${courseData.id}`)}} variant="contained" sx={{
                                             backgroundColor:colors.purple[500],
                                             width:"fit-content", 
                                             color:colors.white[100],
                                             textTransform:"capitalize",
                                             "&:hover":{ backgroundColor:colors.purple[600] },
                                             transition:"all 0.3s"
                                        }}>
                                             View Playlists
                                        </Button>
                                   </CardActions>
                              </Card>)
                             
                              
                         
                     })
                    }
               </Box>

               {user?.user?.savedPlaylists.length > 8 && (
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} p={"30px"}>
                         <Button onClick={()=>{navigate("/Course")}} variant="contained" sx={{
                              backgroundColor:colors.yellow[100],
                              width: "fit-content", 
                              color:colors.white[100],
                              textTransform:"capitalize",
                              "&:hover":{ backgroundColor:colors.yellow[200] },
                              transition: "all 0.3s"
                         }}>
                              load more
                         </Button>
                    </Box>
               )}
                    </Box> :
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>
                         <Typography variant="h1">No Saved Courses</Typography>
          </Box>
            }
         </>
         
     )
}

export default SavedPlaylits;
