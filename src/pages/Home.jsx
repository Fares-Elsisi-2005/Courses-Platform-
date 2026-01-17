import { useTheme, Box,  Stack ,Typography, Divider, Chip,   Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import { tokens } from "../theme";
 import { useMemo,useState,useEffect } from "react";
import {formatTimestamp,  getimageUrl } from "./../services/serviceProvider";
import * as FaIcons from "react-icons/fa"; // all fontawesome icons
import * as IoIcons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as SiIcons from "react-icons/si";
 
import { useAppData } from "../Contexts/AppContext";
import { useAuth } from "../Contexts/AuthContext";
 
import { useGetUser } from "../hooks/useGetUser";
import { useGetAllCourses } from "../hooks/useGetAllCourses";



const allIcons = { 
     ...FaIcons, 
     ...IoIcons, 
     ...MdIcons,
     ...HiIcons,
     ...SiIcons,

  

};

const CardHeader = ({ userId, courseData }) => {
            
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
      
     

     const { userData, loading } = useGetUser(userId);
     if(loading) return <Stack mb={"10px"} flexGrow={1} spacing={1}>
     <Skeleton variant="circular" width={40} height={40} />
     <Skeleton variant="rectangular" flexGrow={1}sx={{minWidth:"100px"}} height={60} />
     </Stack>
 
 
     return(
           <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
               <Avatar alt="Ardit korko" src= {userData?.image} /> 
               <Box>
                    <Typography variant="h5">{ userData?.name}</Typography>
                    <Typography variant="h6" sx={{ color: colors.primary[300], }}> {formatTimestamp( courseData.createdAt)}</Typography>

               </Box>
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


const Home = () => {
     const { state } = useAppData();
     const {  categories } = state;
     const { user } = useAuth();  
     
     let currentUserRole = user?.role || "guest";
     
          
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const navigate = useNavigate(); 
     const [paginatedCourses, setPaginatedCourses] = useState([]);
     
     const {
     getCourses,
     resetPagination,
     loading2,
     error2,
     hasMore,
     } = useGetAllCourses();



     const handleClickChipMainCategory = (mainCategoryid) => {
          navigate(`/Courses/${mainCategoryid}`)
     };
     const handleClickChipSubCategory = (mainCategoryid,subCategoryid ) => {
          navigate(`/Courses/${mainCategoryid}/${subCategoryid}`)
          
     }

     const handleBecomingTeacher = () => {
          if(currentUserRole === "guest"){
               navigate("/SignUp")
          } else {
               navigate("/BecomeTeacher")
               
          }
     }


     
     // Initial fetch
     useEffect(() => {
          resetPagination();
          setPaginatedCourses([]);
          loadMoreCourses(); 
     }, []);

     const loadMoreCourses = async () => {
     const newCourses = await getCourses();
     setPaginatedCourses((prev) => [...prev, ...newCourses]);
     };
  


     // --------------------------------------------------
     // Loading guard (edit mode only)
     // --------------------------------------------------

     if (loading2) return  <Box display={"flex"} gap={"20px"}  flexWrap={"wrap"}><Variants /><Variants /><Variants /></Box>;
     {/* <Typography>Loading  courses...</Typography> */ }
     if (error2) return <Typography>Error  paginated courses</Typography>;




     return ( 
          <Box display={"flex"} flexDirection={"column"} gap={"50px"} >
               <Box>
                    <Typography variant="h3">Quick Options</Typography>
                    <Divider sx={{ margin: "15px 0px" }} />
                    <Box
                         display="grid"
                         gap={2} // spacing between cards
                         sx={{
                         gridTemplateColumns: {
                              xs: "1fr",       // mobile → 1 card
                              sm: "repeat(3, 1fr)", // tablet → 3 cards
                              md: "repeat(4, 1fr)", // desktop → 4 cards
                         },
                         }}
                         >
                         {currentUserRole !== "guest"  ? 
                              <Box sx={{
                              backgroundColor: colors.primary[200],
                              borderRadius: "10px",
                              padding: "20px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                              height:"fit-content"

                              
                              
                         }}>
                              <Typography variant="h4" sx={{marginBottom:"10px",width:"100%"}}>Likes And Comments</Typography>
                              <Typography variant="h5">total Liked Videos: <span style={{color:colors.purple[500]}}>{user.user.likedVideos.length}</span></Typography>
                              <Button onClick={()=>{navigate("/LikedVideos")}} variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100]  }}>View Liked vidoes</Button>
                              <Typography variant="h5">total Comments: <span style={{color:colors.purple[500]}}>{user.user.userCommentsId.length}</span></Typography>
                              <Button variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100]  }}>View comments</Button>
                              <Typography variant="h5">Saved Playlists: <span style={{ color: colors.purple[500] }}>{user.user.savedPlaylists.length}</span></Typography>
                              <Button  onClick={()=>{navigate("/SavedPlaylits")}} variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100]  }}>View Playlists</Button>
                             

                              
                              
                         </Box>
                         :<></>}
                         <Box sx={{
                              backgroundColor: colors.primary[200],
                              borderRadius: "10px",
                              padding: "20px",
                              display: "flex",
                              flexWrap:"wrap",
                              gap: "10px",
                              height:"fit-content"
                              
                         }}>
                              <Typography variant="h4" sx={{ marginBottom: "10px", width: "100%" }}>Categories</Typography>
                              {categories.map((category, index) => {
                                   const IconComponent = allIcons[category.icon]; 

                                   return (
                                        <Chip key={index} sx={{ width: "fit-content" }} onClick={()=>{handleClickChipMainCategory(category.categoryId)}} icon={IconComponent ? <IconComponent size={20} />  : null} label={category.name} />
                                        
                                   )
                                })}

                              
                              
                         </Box>
                         <Box sx={{
                              backgroundColor: colors.primary[200],
                              borderRadius: "10px",
                              padding: "20px",
                              display: "flex",
                              flexWrap:"wrap",
                              gap: "10px",
                              height:"fit-content"
                              
                         }}>
                              <Typography variant="h4" sx={{marginBottom:"10px",width:"100%"}}>Sub Categories</Typography>
                                
                               
                               {categories.map((category, i) =>
                                   category.subCategories.map((subCategory, j) => {
                                        const IconComponent = allIcons[subCategory.icon];
                                        return (
                                             <Chip
                                             key={`${i}-${j}`}
                                             sx={{ width: "fit-content" }}
                                             onClick={()=>{handleClickChipSubCategory(category.categoryId,subCategory.id)}}
                                             icon={IconComponent ? <IconComponent size={20} /> : null}
                                             label={subCategory.name}
                                             />
                                        );
                                   })
                              )}
                             
                              


                              
                              
                         </Box>
                          
                         {currentUserRole !== "teacher" ?
                              
                         <Box sx={{
                              backgroundColor: colors.primary[200],
                              borderRadius: "10px",
                              padding: "20px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                              height: "fit-content",
                              
                              
                              
                         }}>
                              <Typography variant="h4" sx={{marginBottom:"10px"}}>Become A Tutor</Typography>
                              <Typography variant="body1">Publish the course you want, in the way you want, and always have control of your own content.</Typography>
                              <Button onClick={handleBecomingTeacher} variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100]  }}>get started</Button>
                              

                              
                              
                         </Box>
                               :<></>
                              
                          }
                          
                        


                         
                    </Box>

                    
               </Box>
               <Box>
                     <Typography variant="h3">Recommended for you</Typography>
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
                         paginatedCourses.map((course) => (
                              <Card key={course.id} sx={{ maxWidth: "100%",display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
                                   <CardContent>
                                       

                                        <CardHeader userId={course.teacherId } courseData={course } />

                                        <Box position={"relative"}>
                                             <CardMedia
                                                  sx={{ height: 260 }}
                                                  image={getimageUrl(course.image)}
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
                                        <Button onClick={()=>{navigate(`/Course/${course.id}`)}} variant="contained" sx={{backgroundColor:colors.purple[500],
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
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} p={"30px"}  >
                         <Button onClick={() => {
                              navigate("/Courses")
                         }} variant="contained" sx={{backgroundColor:colors.yellow[100],
                         width: "fit-content", 
                                   
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.yellow[200]
                                    },
                         transition: "all 0.3s"
                    }}>
                         View All Courses
                    </Button>
                    </Box>
               </Box>
          </Box>
     )
}
 

export default Home;