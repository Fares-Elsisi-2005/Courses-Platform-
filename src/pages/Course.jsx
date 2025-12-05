import { useTheme, Box, Button, Typography, Divider, Avatar } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { tokens } from "../theme";
import { useNavigate,  useParams } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useState } from "react";
import {getimageUrl, getCourse,getuserByid} from "./../services/serviceProvider";
import { useAppData } from "../Contexts/AppContext";
 

const Course = () => {
     const { state,dispatch } = useAppData();
     const { courses,  users ,currentUser} = state;
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const { id } = useParams();
     const navigate = useNavigate();
     let courseData = getCourse(courses, id);
     const [isCourseSaved, setIsCourseSaved] = useState(currentUser.savedPlaylits.includes(courseData.courseId));
    
     function handleCourseSaved(CourseSavedState) {
          setIsCourseSaved(!isCourseSaved)
          if (CourseSavedState) {
               dispatch({ type: "courseSaved", payload: { course: courseData } })
               
          } else {
               dispatch({ type: "courseUnSaved", payload: { course: courseData } })
               
          }
     }
     

     return ( 
          <Box>
             {/*   {courses.filter((Course) => Course.courseId == id)[0].playlist.map((video) => {
                   console.log(video)
               })} */}
               
                <Box mb={"40px"}>
                    <Typography variant="h3">Playlist Details</Typography>
                    <Divider sx={{ margin: "15px 0px" }} />
                    <Box borderRadius={"10px"} p={"20px"}
                         backgroundColor={colors.primary[200]}> 
                         
                         <Button  onClick={()=>{handleCourseSaved(!isCourseSaved)}} sx={{backgroundColor:colors.primary[100],mb:"20px"}}>
                              {isCourseSaved ?
                                   <BookmarkIcon sx={{ color: colors.purple[500], mr: "5px" }} />
                                   :
                                   <BookmarkBorderIcon sx={{ color: colors.primary[300], mr: "5px" }} />}
                              
                              <Typography sx={{ color: colors.grey[400] }}>{isCourseSaved?"Saved":"Save Playlist"}</Typography>
                         </Button>
                         <Box display={"grid"}
                              gap={"20px"} 
                              sx={{
                                   gridTemplateColumns:{
                                        xs: "auto",      
                                        sm: "auto",  
                                        md:"auto auto",
                                        lg: "auto auto",  
                                   },
                                   }}
                         > 
                              <Box      >
                                   <Box position={"relative"}>
                                             <img style={{width:"100%", borderRadius:"10px" }} src= {getimageUrl(courseData.image)} alt="" />
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
                                   
                              </Box>
                              <Box alignSelf={"start"}>
                                   <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                             <Avatar alt="Ardit korko" src= {getimageUrl(getuserByid(users,courseData.teacherId).image)}  /> 
                                             <Box>
                                             <Typography variant="h5">{ getuserByid(users,courseData.teacherId).name}</Typography>
                                             <Typography variant="h6" sx={{ color: colors.primary[300], }}>{ courseData.createdAt}</Typography>

                                             </Box>
                                   </Box>
                                   <Box  >
                                        <Typography variant="h4" sx={{marginBottom:"10px"}}>{courseData.title}</Typography>
                                        <Typography variant="body1">{ courseData.description}</Typography>
                                        <Button onClick={()=>{navigate(`/UserProfile/${courseData.teacherId}`)}} variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100], margin:"20px 0"  }}>View Profile</Button>
                                   </Box>

                              </Box>
                         </Box>
                    </Box>
               </Box>
               <Typography variant="h3">Playlist Videos</Typography>
                    <Divider sx={{ margin: "15px 0px" }} />
               <Box    display="grid"
                         gap={2} // spacing between cards
                         sx={{
                         gridTemplateColumns: {
                              xs: "1fr",         
                              sm: "1fr 1fr",  
                              md:"1fr 1fr 1fr",
                              lg: "1fr 1fr 1fr ",  
                         },
                         }}>
                   
                      
                       
                    {courseData.playlist.map((video) => (
                         <Card key={video.videoId}  sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                               

                              <Box onClick={()=>{navigate(`/Video/${courseData.courseId}/${video.videoId}`)}}
                                   position={"relative"} sx={{ cursor: "pointer",overflow:"hidden" }}>
                                     
                                   <img
                                        src= {getimageUrl(video.thumbImage)}
                                        loading="lazy"
                                        alt=""
                                        style={{
                                             width: "100%",
                                             height: "100%",
                                              
                                             
                                        }}
                                   />
                                   
                                   <Box sx={{
                                        position: "absolute",
                                        top: "0",
                                        left: "0",
                                        width: "100%",
                                        height: "calc(100% - 6px)", // Adjust for any border/padding
                                        backgroundColor: "transparent",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        "&:hover": {
                                             backgroundColor:"#0000009c"
                                        },
                                        "&:hover .playIcon": {
                                             display:"block"
                                        }
                                   }}>
                                        <PlayArrowIcon className="playIcon" sx={{color:"white", fontSize:"60px",display:"none"}}/>
                                   </Box>

                              </Box>
                              <Typography variant="h5" component="div" mt={"10px"}>
                                   {video.title}
                              </Typography>
                               
                         </CardContent>
                      
                    </Card>
                    ))}
                      
                    

               </Box>


          </Box>
     )
}
 

export default Course;
