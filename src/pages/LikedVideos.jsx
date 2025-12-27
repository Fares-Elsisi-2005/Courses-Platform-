 import { useTheme, Box, Typography, Divider, Chip, Stack, Button } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
 
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { tokens } from "../theme";
import { useEffect, useRef,useMemo } from "react";
import { useNavigate  } from "react-router-dom";
import {getimageUrl } from "../services/serviceProvider";
 

import { useAuth } from "../Contexts/AuthContext";
import { useGetTeacherCourses } from "../hooks/useGetCoursesById";
 

 
const LikedVideos = () => {
      
     const { user } = useAuth();  
     

     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const divider = useRef(null); 
     const navigate = useNavigate();
     
     
     const likedVideos = user.user.likedVideos.map((obj) => obj.videoId);
     const coursesids = user.user.likedVideos.map((obj) => obj.courseId);

     const courseQuery = useMemo(() => coursesids, []);
     
      const { courses, loading, error } = useGetTeacherCourses(courseQuery );

     
     

     useEffect(() => {
          divider.current?.scrollIntoView();
     }, []); 



     // --------------------------------------------------
     // Loading guard (edit mode only)
     // --------------------------------------------------

     if (loading) {
               return <Typography>Loading course...</Typography>;
     } 

     let Videos = [];
     
     for (let i = 0; i < courses.length; i++) { 
           
           courses[i].playlist.forEach(video => {
                if (likedVideos.includes(video.videoId)) {
                    Videos.push(video);
               }
           });
          
     }
 
     return ( 

          <>
               {user.user.likedVideos.length > 0 ?
                     <Box>
               <Typography variant="h3">Liked Videos</Typography>
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
                     Videos.map((videoData, index) => {
                         
                        
                          return ( 
                                <Card key={videoData?.videoId}  sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                               

                              <Box onClick={()=>{navigate(`/Video/${coursesids[index]}/${likedVideos[index]}`)}}
                                   position={"relative"} sx={{ cursor: "pointer",overflow:"hidden" }}>
                                     
                                   <img
                                        src= {getimageUrl(videoData?.thumbImage)}
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
                                   {videoData?.title}
                              </Typography>
                               
                         </CardContent>
                      
                    </Card>
                              
                         )
                             
                              
                         
                     })
                    }
                   
               </Box>

               {user.user.likedVideos.length > 8 && (
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
                    </Box> : <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>
                         <Typography variant="h1">No liked Videos</Typography>
          </Box>

               }
               
          </>

       
         
     )
}

export default LikedVideos;
