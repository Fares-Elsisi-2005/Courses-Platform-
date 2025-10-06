 import { useTheme, Box, Typography, Divider, Chip, Stack, Button } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import { tokens } from "../theme";
import { useEffect, useRef } from "react";
import { useNavigate  } from "react-router-dom";
import {  getCourse ,getuserByid} from "./../services/serviceProvider";
/* import { courses} from "../data/data";
 */
import { useAppData } from "../Contexts/AppContext";

const SavedPlaylits = () => {
     const { state } = useAppData();
     const {currentUser,users,courses} = state;
      

     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const divider = useRef(null); 
     const navigate = useNavigate();

     useEffect(() => {
          divider.current?.scrollIntoView();
     }, []); 
     return ( 
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
                     currentUser.savedPlaylits.map((courseid) => {
                         const courseData = getCourse(courses,courseid)
                         console.log("saved Courses: ",courseData)

                         return(<Card key={courseData.courseId} sx={{ maxWidth: "100%", display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
                                   <CardContent>
                                        <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                             <Avatar alt="Ardit korko" src={getuserByid(users,courseData.teacherId).image} /> 
                                             <Box>
                                                  <Typography variant="h5">{ getuserByid(users,courseData.teacherId).name}</Typography>
                                                  <Typography variant="h6" sx={{ color: colors.primary[300], }}> { courseData.createdAt}</Typography>
                                             </Box>
                                        </Box>

                                        <Box position={"relative"}>
                                             <CardMedia
                                                  sx={{ height: 260 }}
                                                  image={courseData.image}
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
                                        <Button onClick={()=>{navigate(`/Course/${courseData.courseId}`)}} variant="contained" sx={{
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

               {currentUser.savedPlaylits.length > 8 && (
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
          </Box>
     )
}

export default SavedPlaylits;
