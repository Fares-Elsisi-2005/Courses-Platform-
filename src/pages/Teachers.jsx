import {useTheme, Box, Stack,Button ,Typography,Divider,InputBase,IconButton   } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import SearchTeachersBar from "../components/SearchTeachersBar";
 
import { useAuth } from "../Contexts/AuthContext";

 
import { useGetTeacherCourses } from "../hooks/useGetCoursesById";
import { useGetUser } from "../hooks/useGetUser";
import { useGetusersByRole } from "../hooks/useGetUsersByRole";

import { getimageUrl,  getTotalPlaylists,getTotalVideos,getTotalPlaylitslikes } from "./../services/serviceProvider";
import { useState,useEffect ,useMemo} from "react";
 


const TeacherAnalytics = ({teacher, coursesIds}) => {
     
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     
     const teacherCourseIds = useMemo(
               () => coursesIds || [],
               [coursesIds]
          ); 
          
     const { courses, loading} = useGetTeacherCourses(teacherCourseIds);
     
     
       // -------------------------------
       // LOADING / ERROR
       // -------------------------------
      
     
     if (loading) return <Typography>Loading Analytics...</Typography>;
     

     return (
          <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
               <Typography variant="h5" sx={{color:colors.grey[400]}} >total playlists: <span style={{color:colors.purple[500]}}>{teacher.teacherCourses.length}</span></Typography>
               <Typography variant="h5" sx={{color:colors.grey[400]}}>total videos: <span style={{color:colors.purple[500]}}>{getTotalVideos(courses )}</span></Typography>
               <Typography variant="h5" sx={{color:colors.grey[400]}}>total likes: <span style={{color:colors.purple[500]}}>{getTotalPlaylitslikes(courses )}</span></Typography>
          </Box>
     )
}


const Variants=() =>{
  return (
    <Stack flexGrow={1} spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" flexGrow={1}sx={{minWidth:"210px"}} height={60} />
      <Skeleton variant="rounded"flexGrow={1}sx={{minWidth:"210px"}}   height={60} />
    </Stack>
  );
}


const Teachers = () => {
    
     const { user } = useAuth();  
     let currentUserRole = user?.role || "guest";
     
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const navigate = useNavigate();
     const [paginatedUsers,  setPaginatedUsers] = useState([]);
     const {getAllTeachers,
     resetPagination,
     loadingTeachers,
     error,
          hasMore, } = useGetusersByRole();
     
      
     
     // Initial fetch
       useEffect(() => {
          
            resetPagination();
            setPaginatedUsers([]);
            loadMoreUsers();
         
       }, []);
     
     
          const loadMoreUsers = async () => {
          const newUsers = await getAllTeachers("teacher");
          setPaginatedUsers((prev) => [...prev, ...newUsers]);
          };

     const handleBecomingTeacher = () => {
          if(currentUserRole === "guest"){
               navigate("/SignUp")
          } else {
               navigate("/BecomeTeacher")
               
          }
     }

     
       
       
        
       // -------------------------------
       // LOADING / ERROR
       // -------------------------------
      
     
     if (loadingTeachers) return <Box display={"flex"} gap={"20px"}  flexWrap={"wrap"}><Variants /><Variants /><Variants /></Box>;
     
     if (error) return <Typography>{ console.log("the error form teachers page: ",error)}Error loading  Teachers !</Typography>;
     
      
        
     
     return ( 
          <Box>
               <Typography variant="h3">Expert Teachers</Typography>
               <Divider sx={{ mt:"15px",mb:"25px"}} />
               <Box display="flex" position="relative"  backgroundColor={colors.primary[200]} borderRadius="3px" flex={"1"}   maxWidth={"100%"} mb={"20px"}>
                               
                               <SearchTeachersBar />
                               
               </Box>
               <Box  display="grid"
                         gap={2} // spacing between cards
                         sx={{
                         gridTemplateColumns: {
                              xs: "1fr",       // mobile  
                                   sm: "1fr 1fr", // tablet  
                              md:"1fr 1fr 1fr",
                              lg: "1fr 1fr 1fr ", // desktop 
                         },
                    }}>
                    
                    {currentUserRole !== "teacher" ?
                         <Box sx={{
                              backgroundColor: colors.primary[200],
                              borderRadius: "10px",
                              padding: "20px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                         maxHeight: "90%", 
                              
                         }}>
                              <Typography variant="h4" sx={{marginBottom:"10px"}}>Become A Tutor</Typography>
                              <Typography variant="body1">Publish the course you want, in the way you want, and always have control of your own content.</Typography>
                              <Button onClick={handleBecomingTeacher} variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100], mb:"20px"  }}>Get started</Button>
                              

                              
                              
                    </Box>:<></>
 
                    }
                    
                    {paginatedUsers.map((teacher) => (
                          <Card key={teacher.userId} sx={{ maxWidth: "100%" }}>
                         
                         
                              <CardContent>
                                   <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                        <Avatar alt="Ardit korko" src= {getimageUrl(teacher.image)}  /> 
                                        <Box>
                                             <Typography variant="h5">{teacher.name}</Typography>
                                             <Typography variant="h6" sx={{color:colors.primary[300],}}>{teacher.role}</Typography>

                                        </Box>
                                   </Box>

                                   <TeacherAnalytics teacher={teacher} coursesIds={teacher.teacherCourses}/>
                              
                                   
                              </CardContent>
                              <CardActions>
                                   <Button onClick={()=>{navigate(`/UserProfile/${teacher.userId}`)}} variant="contained" sx={{backgroundColor:colors.purple[500],
                                        width:"fit-content", 
                                        color:colors.white[100],
                                        textTransform:"capitalize",
                                        "&:hover":{
                                             backgroundColor:colors.purple[600]
                                        },
                                        transition:"all 0.3s"  }}>View profile</Button>
                              
                              </CardActions>
                         </Card>
                    ))}
 
               </Box>
                    
          </Box>
     )
}
 

export default Teachers;