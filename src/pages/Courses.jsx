 import { useTheme, Box, Typography, Divider, Chip, Stack, Button } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import { tokens } from "../theme";
import { useEffect, useRef, useState } from "react";
import { useNavigate,useParams  } from "react-router-dom";
import { getuserByid,getCoursesByMainCategory,getCoursesBySubCategory,getsubCategoryName,getCategoryName} from "./../services/serviceProvider";
import { courses} from "../data/data";

const Courses = () => {
     const [title, setTitle] = useState("Our Courses");
     const [filteredCourses, setFilteredCourses] = useState(courses);

     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const divider = useRef(null);
     const { categoryParam, subCategoryParam} = useParams();
     const navigate = useNavigate();

     useEffect(() => {
          divider.current?.scrollIntoView();
     }, []);

     useEffect(() => {
          const validCategories = [...new Set(courses.map((c) => c.mainCategoryId))];
          const validSubCategories = [...new Set(courses.map((c) => c.subCategoryId))];

          let newCourses = courses;
          let newTitle = "Our Courses";

          if (validCategories.includes(categoryParam) && validSubCategories.includes(subCategoryParam)) {
               newCourses = getCoursesBySubCategory(categoryParam, subCategoryParam);
               newTitle = getsubCategoryName(categoryParam,subCategoryParam);
          } else if (validCategories.includes(categoryParam)) {
               newCourses = getCoursesByMainCategory(categoryParam);
               newTitle = getCategoryName(categoryParam);
          }

          setFilteredCourses(newCourses);
          setTitle(newTitle);
     }, [categoryParam, subCategoryParam]);

     return ( 
          <Box>
               <Typography variant="h3">{title} {title === "Our Courses"?null:"Courses" }</Typography>
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
                         filteredCourses.map((course) => (
                              <Card key={course.courseId} sx={{ maxWidth: "100%" }}>
                                   <CardContent>
                                        <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                             <Avatar alt="Ardit korko" src={getuserByid(course.teacherId).image} /> 
                                             <Box>
                                                  <Typography variant="h5">{ getuserByid(course.teacherId).name}</Typography>
                                                  <Typography variant="h6" sx={{ color: colors.primary[300], }}> { course.createdAt}</Typography>
                                             </Box>
                                        </Box>

                                        <Box position={"relative"}>
                                             <CardMedia
                                                  sx={{ height: 260 }}
                                                  image={course.image}
                                                  title={course.title}
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
                                        <Button onClick={()=>{navigate(`/Course/${course.courseId}`)}} variant="contained" sx={{
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
                              </Card>
                         ))
                    }
               </Box>

               {courses.length > 8 && (
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

export default Courses;
