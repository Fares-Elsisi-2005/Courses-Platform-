import {useTheme, Box,Button ,Typography,Divider,Avatar  } from "@mui/material";
import { tokens } from "../theme";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { useNavigate,useParams } from "react-router-dom";
import {getCoursesById, getuserByid,getTotalPlaylists,getTotalVideos,getTotalPlaylitslikes,getTotalEnrolledStudent,getTotalComments} from "./../services/serviceProvider";
import { useAppData } from "../Contexts/AppContext";

/* 
 {
    userId: "u_1001",
    name: "Elzero",
    email: "elzero@gmail.com",
    role: "teacher", 
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    teacherCourses: ["c_2001"],
    createdAt: "2025-08-20T10:00:00Z",
    savedPlaylits: ["c_2001"],
    enrolledCourses: ["c_2001"], 
    likedVideos: ["v_3001", "v_3002"],
    userCommentsId:[ ]
    
  }
 */
const TeacherProfile = () => {
     const { state } = useAppData();
     const { courses,users } = state;
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const { id } = useParams();
     const navigate = useNavigate();
     let teacherData = getuserByid(users,id);
     return (
          <Box>
               <Typography variant="h3">Profile Details</Typography>
               <Divider sx={{ mt: "15px", mb: "25px" }} />
               <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} sx={{backgroundColor:colors.primary[200],borderRadius:"8px",p:"20px",gap:"50px"}}>
                    <Box display={"flex"} flexDirection={"column"} marginBottom={"20px"} gap={"10px"} textAlign={"center"}  >
                         <Avatar alt="Ardit korko" src= {teacherData.image} sx={{ width: 56, height: 56,alignSelf:"center" }}  /> 
                         <Box>
                              <Typography variant="h5">{ teacherData.name}</Typography>
                              <Typography variant="h6" sx={{ color: colors.primary[300], }}>{ teacherData.role}</Typography>
                         </Box>
                    </Box>
                    
                    <Box display="grid"
                         width={"100%"}
                          
                         gap={2} // spacing between cards
                         sx={{
                         gridTemplateColumns: {
                              
                              sm: "1fr", // tablet → 3 cards
                              md: "repeat(4, 1fr)", // desktop → 4 cards
                         },
                         }}>
                         
                         <Box backgroundColor={colors.primary[100]} p={"20px"} borderRadius={"7px"} textAlign={"center"} >
                              <Typography variant="h5" sx={{ color: colors.grey[400] }} >total playlists: <span style={{ color: colors.purple[500], fontWeight: "bold", fontSize: "20px" }}>{ getTotalPlaylists(users,id)}</span></Typography>
                         </Box>
                         
                         <Box backgroundColor={colors.primary[100]} p={"20px"} borderRadius={"7px"} textAlign={"center"}>
                              <Typography variant="h5" sx={{ color: colors.grey[400] }} >total videos: <span style={{ color: colors.purple[500], fontWeight: "bold", fontSize: "20px" }}>{ getTotalVideos(courses,users,id)}</span></Typography>
                         </Box>
                         
                         <Box backgroundColor={colors.primary[100]} p={"20px"} borderRadius={"7px"} textAlign={"center"}>
                              <Typography variant="h5" sx={{ color: colors.grey[400] }} >total  enrolled students: <span style={{color:colors.purple[500],fontWeight:"bold",fontSize:"20px"}}>{getTotalEnrolledStudent(courses,users,id)}</span></Typography>
                         </Box>
                         
                         <Box backgroundColor={colors.primary[100]} p={"20px"} borderRadius={"7px"} textAlign={"center"}>
                              <Typography variant="h5" sx={{ color: colors.grey[400] }} >total  likes: <span style={{color:colors.purple[500],fontWeight:"bold",fontSize:"20px"}}>{getTotalPlaylitslikes(courses,users,id)}</span></Typography>
                         </Box>
                         
                         <Box backgroundColor={colors.primary[100]} p={"20px"} borderRadius={"7px"} textAlign={"center"}>
                              <Typography variant="h5" sx={{color:colors.grey[400]}} >total comments: <span style={{color:colors.purple[500],fontWeight:"bold",fontSize:"20px"}}>{getTotalComments(courses,users,id)}</span></Typography>
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
                                   <Typography variant="h4" sx={{ color: colors.grey[400] }} >Saved Playlists: <span style={{ color: colors.purple[500], fontWeight: "bold", fontSize: "20px", display: "block" }}>{ teacherData.savedPlaylits.length}</span></Typography>
                             </Box>
                              <Button variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100], margin:"20px 0"  }}>view saved playlists</Button>
                              
                         </Box>
                         
                        
                         <Box backgroundColor={colors.primary[100]} p={"20px"} borderRadius={"7px"}  >
                              <Box display={"flex"}>
                                    <FavoriteIcon sx={{fontSize:"50px",p:"10px", backgroundColor:colors.primary[300],color:colors.primary[200],borderRadius:"8px",mr:"20px"}}/>
                                   <Typography variant="h4" sx={{ color: colors.grey[400] }} >Liked Videos: <span style={{ color: colors.purple[500], fontWeight: "bold", fontSize: "20px", display: "block" }}>{teacherData.likedVideos.length}</span></Typography>
                             </Box>
                              <Button variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100], margin:"20px 0"  }}>View Liked Vidoes</Button>
                              
                         </Box>
                         
                         <Box backgroundColor={colors.primary[100]} p={"20px"} borderRadius={"7px"}  >
                              <Box display={"flex"}>
                                    <ModeCommentIcon sx={{fontSize:"50px",p:"10px", backgroundColor:colors.primary[300],color:colors.primary[200],borderRadius:"8px",mr:"20px"}}/>
                                   <Typography variant="h4" sx={{ color: colors.grey[400] }} >your comments: <span style={{ color: colors.purple[500], fontWeight: "bold", fontSize: "20px", display: "block" }}>{teacherData.userCommentsId.length}</span></Typography>
                             </Box>
                              <Button variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100], margin:"20px 0"  }}>View Comments</Button>
                              
                         </Box>
                         
                        
                          

                    </Box>
                    
                    
               </Box>
               <Box mt={"30px"}>
                     <Typography variant="h3">Coures</Typography>
                    <Divider sx={{ margin: "15px 0px" }} />
               <Box    display="grid"
                         gap={2} // spacing between cards
                         sx={{
                         gridTemplateColumns: {
                              xs: "1fr",       // mobile  
                                   sm: "1fr 1fr", // tablet  
                              md:"1fr 1fr 1fr",
                              lg: "1fr 1fr 1fr ", // desktop 
                         },
                         }}>
                   
                      
                         {
                              getCoursesById(courses,users,id).map((course) => (
                                   <Card key={course.courseId} sx={{ maxWidth: "100%", display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                              
                              
                                        <CardContent>
                                             <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                                  <Avatar alt="Ardit korko" src={ getuserByid(users,course.teacherId).image}  /> 
                                                  <Box>
                                                       <Typography variant="h5">{ getuserByid(users,course.teacherId).name}</Typography>
                                                       <Typography variant="h6" sx={{ color: colors.primary[300], }}> { course.createdAt}</Typography>
     
                                                  </Box>
                                             </Box>
     
                                             <Box position={"relative"}>
                                                  <CardMedia
                                                       sx={{ height: 260 }}
                                                       image={course.image}
                                                       title="green iguana"
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
                                                       <Typography variant="h6">{`${course.playlist.length} videos`}</Typography>
                                                       
                                                  </Box>
     
     
                                             </Box>
                                             <Typography variant="h5" component="div" mt={"10px"}>
                                                       {course.title}
                                             </Typography>
                                             
                                        </CardContent>
                                        <CardActions>
                                             <Button onClick={()=>{navigate(`/Course/${course.courseId}`)}} variant="contained" sx={{backgroundColor:colors.purple[500],
                                                  width:"fit-content", 
                                                  color:colors.white[100],
                                                  textTransform:"capitalize",
                                                  "&:hover":{
                                                       backgroundColor:colors.purple[600]
                                                  },
                                                  transition:"all 0.3s"  }}>View Playlists</Button>
                                        
                                        </CardActions>
                                   </Card>
                              ))
                         }
                                        
                
                    </Box>
                    {getCoursesById(courses,users,id).length > 8 ?
                         <Box display={"flex"} justifyContent={"center"} alignItems={"center"} p={"30px"}  >
                              <Button onClick={() => { navigate("/Courses") }} variant="contained" sx={{
                                   backgroundColor: colors.yellow[100],
                                   width: "fit-content",
                                   
                                   color: colors.white[100],
                                   textTransform: "capitalize",
                                   "&:hover": {
                                        backgroundColor: colors.yellow[200]
                                   },
                                   transition: "all 0.3s"
                              }}>
                                   load more
                              </Button>
                         </Box>:null}
               </Box>
               

          </Box>
     )
}
 

export default TeacherProfile;