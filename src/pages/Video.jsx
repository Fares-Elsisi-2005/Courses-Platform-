import {useTheme, Box,Button ,Typography ,Divider,Avatar,TextField ,TextareaAutosize  } from "@mui/material";
import { tokens } from "../theme";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate,  useParams  } from "react-router-dom";
import ReactPlayer from "react-player";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
 
import { useState } from "react";
import Comments from "../components/Comments";
import {getimageUrl, getCourse, getuserByid } from "./../services/serviceProvider";
import { useAppData } from "../Contexts/AppContext";


 

const Video = () => {
     const { state ,dispatch} = useAppData();
     const { courses,users,currentUser } = state;
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const { courseid,videoid } = useParams();
     const navigate = useNavigate();
     let courseData = getCourse(courses,courseid)
     let videoData = courseData.playlist.filter((video) => video.videoId === videoid)[0]
     const [islike, setIslike] = useState(currentUser.likedVideos.includes(videoid)) 

     function handleVideoLiked(likeState) { 
          setIslike(!islike)

          if (likeState) {
               dispatch({type:"VideoLiked",payload:{course:courseData,videoId:videoid}})
          } else {
               dispatch({type:"VideoUnLiked",payload:{course:courseData,videoId:videoid}})
               
          }
          

          
     }
     return (
          <Box>
                
               <Box sx={{
               backgroundColor: colors.primary[200],
                    p: "15px",
               mb:"40px"
               
          }} >
        
     
               <Box sx={{
               aspectRatio: "16/9",
                    borderRadius: "7px",
                   
                    overflow: "hidden"
          }} >
               <ReactPlayer
                         slot="media"
                         src= {videoData.url}
                         controls 
                         style={{
                              width: "100%",
                              height: "100%",
                                
                              
                         }}
               ></ReactPlayer>
               </Box>
               <Box >
                         <Typography sx={{ margin: "10px 0" }} variant="h5">{videoData.title}</Typography>

                    <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                         <Box  display={"flex"} gap={"10px"}>
                              <Box display={"flex"} gap={"5px"}  >
                              <CalendarTodayIcon sx={{color:colors.purple[500]}} />
                              <Typography>{videoData.createdAt}</Typography>
                              </Box>
                              <Box display={"flex"} gap={"5px"}>
                                   <FavoriteIcon sx={{color:colors.purple[500]}} />
                                   <Typography>{`${videoData.likes} likes`}</Typography>
                              </Box>
                    
                         </Box>
                         <Button onClick={()=>{handleVideoLiked(!islike)}} size="small" display={"flex"} sx={{ backgroundColor: colors.primary[100] }}>
                              
                              {islike ? <FavoriteIcon sx={{color: colors.purple[500], mr: "5px" }}  /> :
                                   <FavoriteBorderIcon  sx={{ color: colors.primary[300], mr: "5px" }} />}
                              <Typography sx={{color:colors.grey[400],textTransform:"lowercase"}} variant="h6" >like</Typography>

                         </Button>

                    </Box>
                    <Divider sx={{ margin: "15px 0px" }} />
               
                    <Box>
                         <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={"15px"}   >
                              <Box display={"flex"}   gap={"10px"} >
                                   <Avatar alt="Ardit korko" src= {getimageUrl(getuserByid(users,courseData.teacherId ).image)}  /> 
                                   <Box>
                                             <Typography variant="h5">{getuserByid(users,courseData.teacherId ).name}</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>{courseData.createdAt}</Typography>

                                   </Box>
                              </Box>

                              <Button onClick={()=>{navigate(`/UserProfile/${courseData.teacherId}`)}} variant="contained" sx={{backgroundColor:colors.purple[500],
                                   width:"fit-content", 
                                   color:colors.white[100],
                                   textTransform:"capitalize",
                                   "&:hover":{
                                   backgroundColor:colors.purple[600]
                                   },
                                   transition: "all 0.3s"
                              }}>View Profile</Button>

                         </Box>
                              <Typography variant="body1">{ courseData.description}</Typography>
                    </Box>

       

               </Box>

               </Box>
                <Typography variant="h3">Add comments</Typography>
               <Divider sx={{ margin: "15px 0px" }} />
               <Box sx={{
                    backgroundColor: colors.primary[200],
                    p: "15px",
                     mb:"40px"
               }}>
                     
               
                    <TextareaAutosize placeholder="enter your comment" style={{ backgroundColor: colors.primary[100], minHeight: "150px", padding: "10px", borderRadius: "7px", minWidth: "100%",maxWidth:"100%", outline: "none", fontFamily: "Sans-serif", fontWeight: "bold", fontSize: "15px", color: colors.primary[300], lineHeight: "1",margin:"15px 0" }}></TextareaAutosize>
                    <Button   variant="contained" sx={{backgroundColor:colors.purple[500],
                                   width:"fit-content", 
                                   color:colors.white[100],
                                   textTransform:"capitalize",
                                   "&:hover":{
                                   backgroundColor:colors.purple[600]
                                   },
                                   transition: "all 0.3s"
                              }}>Add Comment</Button>
               </Box>
               <Typography variant="h3">5 Comments</Typography>
               <Divider sx={{ margin: "15px 0px" }} />

               <Comments/>
          </Box>

     )
}
 

export default Video;