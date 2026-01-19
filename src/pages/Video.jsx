import {useTheme, Box,Button ,Typography ,Divider,Avatar,TextField ,TextareaAutosize  } from "@mui/material";
import { tokens } from "../theme";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate,  useParams  } from "react-router-dom";
import ReactPlayer from "react-player";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
 
import { useState ,useMemo,useEffect} from "react";
import Comments from "../components/handleComment/Comments";
import {formatTimestamp,getimageUrl } from "./../services/serviceProvider";
 


import { useAuth } from "../Contexts/AuthContext";
import { useGetTeacherCourses } from "../hooks/useGetCoursesById";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useGetUser } from "../hooks/useGetUser";
import { useWriteCourse } from "../hooks/useWriteCourse";
import { useVideoComments } from "../hooks/useVideoComments";
import { useWriteComment } from "../hooks/useWriteComment";
 
  
 

const Video = () => {
    
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const { courseid,videoid } = useParams();
     const navigate = useNavigate();
     
     const { user } = useAuth();
     const courseId = useMemo(() => [courseid], [courseid]);
     const { courses, loading, error } = useGetTeacherCourses(courseId);
     const { likedVideos } = user.user;
     const [islike, setIslike] = useState(likedVideos.some((obj) => obj.videoId === videoid));
     const { userData } = useGetUser(courses[0]?.teacherId);
     const { updateUserData } = useUpdateUser();
     const { editCourse } = useWriteCourse();
     const { addComment, editComment, deleteComment,loadingComment,errorComment } = useWriteComment(courseid, videoid,courses[0]?.teacherId);
     const [localCourse, setLocalCourse] = useState(null);
     const { comments, loadingTheComments } = useVideoComments(courseid, videoid);
     

     useEffect(() => {
  setIslike(likedVideos.some((obj) => obj.videoId === videoid));
}, [likedVideos, videoid]);

     
     useEffect(() => {
          if (courses.length > 0) {
          setLocalCourse(courses[0]);
          }
     }, [courses]);

     // ----------------------------------
     // Guards
     // ----------------------------------

          if (!localCourse || loading) {
     return <Typography>Loading video...</Typography>;
     }

     if (loadingTheComments) {
     return <Typography>Loading comments...</Typography>;
     }

     if (error || courses.length === 0) {
     return <Typography>Course not found</Typography>;
     }
     const courseData = localCourse;
 
     const videoData = localCourse.playlist.find(
     (video) => video.videoId === videoid
     );

      if (!videoData) {
     return <Typography>Video not found</Typography>;
     }
 

function handleVideoLiked() {
  setIslike((prev) => {
    const nextIsLike = !prev;

    const updatedUser = {
     ...user.user,
      likedVideos: nextIsLike
        ? [...likedVideos, { courseId: courseId[0], videoId:videoid }]
        : likedVideos.filter((obj) => obj.videoId !== videoid),
    };

    const updatedCourse = {
      ...localCourse,
      playlist: localCourse.playlist.map((video) =>
        video.videoId === videoid
          ? {
              ...video,
              likes: nextIsLike
                ? video.likes + 1
                : Math.max(video.likes - 1, 0),
            }
          : video
      ),
    };

    // 🔥 INSTANT UI UPDATE
    setLocalCourse(updatedCourse);

    // 🔄 FIREBASE SYNC
    editCourse(updatedCourse);
    updateUserData(updatedUser);

    return nextIsLike;
  });
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
                              <Typography>{formatTimestamp(localCourse.createdAt)}</Typography>
                              </Box>
                              <Box display={"flex"} gap={"5px"}>
                                   <FavoriteIcon sx={{color:colors.purple[500]}} />
                                   <Typography>{`${ videoData.likes} likes`}</Typography>
                              </Box>
                    
                         </Box>
                         <Button onClick={()=>{handleVideoLiked( )}} size="small" display={"flex"} sx={{ backgroundColor: colors.primary[100] }}>
                              
                              {islike ? <FavoriteIcon sx={{color: colors.purple[500], mr: "5px" }}  /> :
                                   <FavoriteBorderIcon  sx={{ color: colors.primary[300], mr: "5px" }} />}
                              <Typography sx={{color:colors.grey[400],textTransform:"lowercase"}} variant="h6" >like</Typography>

                         </Button>

                    </Box>
                    <Divider sx={{ margin: "15px 0px" }} />
               
                    <Box>
                         <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={"15px"}   >
                              <Box display={"flex"}   gap={"10px"} >
                                   <Avatar alt="Ardit korko" src= {getimageUrl(userData?.image)}  /> 
                                   <Box>
                                             <Typography variant="h5">{userData?.name}</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>{ formatTimestamp( userData?.createdAt )}</Typography>

                                   </Box>
                              </Box>
 
                              <Button onClick={()=>{navigate(`/UserProfile/${userData?.userId}`)}} variant="contained" sx={{backgroundColor:colors.purple[500],
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
                
                

               <Comments data={  comments } loading={loadingComment} error={errorComment} addComment={addComment} editComment={editComment} deleteComment={deleteComment}/>
          </Box>

     )
}
 

export default Video;