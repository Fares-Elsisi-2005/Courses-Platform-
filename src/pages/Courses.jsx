 import { useTheme, Box, Typography, Divider, Chip, Stack, Button } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import { tokens } from "../theme";
import { useEffect, useRef, useState,useMemo } from "react";
import { useNavigate,useParams  } from "react-router-dom";
import {formatTimestamp,getimageUrl,  getCoursesByMainCategory,getCoursesBySubCategory,getsubCategoryName,getCategoryName} from "./../services/serviceProvider";
 
import { useAppData } from "../Contexts/AppContext";
/* import { useAuth } from "../Contexts/AuthContext"; */
 
import { useGetUser } from "../hooks/useGetUser"; 
import { useGetAllCourses } from "../hooks/useGetAllCourses";
import { useGetCoursesByCategoryId } from "../hooks/useGetCoursesByCategoryId";


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
                    <Typography variant="h5">{  userData?.name }</Typography>
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


const Courses = () => {
  const { state } = useAppData();
  const { categories } = state;
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const divider = useRef(null);

  const { categoryParam, subCategoryParam } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("Our Courses");
   const [paginatedCourses, setPaginatedCourses] = useState([]);

  const {
    getCourses,
    resetPagination,
    loading2,
    error2,
    hasMore,
  } = useGetAllCourses();

  const {
    getCoursesByMainId,
    getCoursesBySubId,
    resetPagination2,
    loadingCoursesbyCategory,
    error,
    hasMore2, }=useGetCoursesByCategoryId();


  // Scroll on mount
  useEffect(() => {
    divider.current?.scrollIntoView();
  }, []);


// Initial fetch
  useEffect(() => {
    
    
     if (categoryParam && subCategoryParam) {
       
       resetPagination2();
       setPaginatedCourses([]);
       loadMoreCoursesBySubCategory();
    } else if (categoryParam) {
        
       resetPagination2();
       setPaginatedCourses([]);
       loadMoreCoursesByMainCategory();
     } else {
      resetPagination();
      setPaginatedCourses([]);
      loadMoreCourses(); 
    }
  }, []);


  const loadMoreCourses = async () => {
    const newCourses = await getCourses();
    setPaginatedCourses((prev) => [...prev, ...newCourses]);
  };

  const loadMoreCoursesByMainCategory = async () => {
    const newCourses = await getCoursesByMainId(categoryParam);
    setPaginatedCourses((prev) => [...prev, ...newCourses]);
  };
  const loadMoreCoursesBySubCategory = async () => {
    const newCourses = await getCoursesBySubId(subCategoryParam);
    setPaginatedCourses((prev) => [...prev, ...newCourses]);
  };
  

  
  
   
  // -------------------------------
  // LOADING / ERROR
  // -------------------------------
 

  if (loading2 || loadingCoursesbyCategory) return  <Box display={"flex"} gap={"20px"}  flexWrap={"wrap"}><Variants /><Variants /><Variants /></Box>;
  if (error2 || error) return <Typography>Error loading  courses</Typography>;

   

  // -------------------------------
  // RENDER
  // -------------------------------
  return (
    <Box>
      <Typography variant="h3">
        {title} {title === "Our Courses" ? null : "Courses"}
      </Typography>

      <Divider ref={divider} sx={{ margin: "15px 0px" }} />

      <Box
        display="grid"
        gap={2}
        sx={{
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
            lg: "1fr 1fr 1fr"
          }
        }}
      >
        {paginatedCourses.length === 0 ? (
          <Typography variant="h4">No courses found</Typography>
        ) : (
          paginatedCourses.map(course => (
          <Card
            key={course.id}
            sx={{
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <CardContent>
              <CardHeader
                userId={course.teacherId}
                courseData={course}
              />

              <Box position="relative">
                <CardMedia
                  sx={{ height: 260 }}
                  image={getimageUrl(course.image)}
                  title={course.title}
                />

                <Box
                  sx={{
                    width: "fit-content",
                    padding: "6px",
                    borderRadius: "5px",
                    backgroundColor: "#000000ac",
                    color: "#fff",
                    position: "absolute",
                    top: "10px",
                    left: "10px"
                  }}
                >
                  <Typography variant="h6">
                    {`${course.playlist.length} videos`}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="h5" mt="10px">
                {course.title}
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                onClick={() => navigate(`/Course/${course.id}`)}
                variant="contained"
                sx={{
                  backgroundColor: colors.purple[500],
                  color: colors.white[100],
                  textTransform: "capitalize",
                  "&:hover": { backgroundColor: colors.purple[600] }
                }}
              >
                View Playlists
              </Button>
            </CardActions>
          </Card>
        )))}
      </Box>

      {hasMore && hasMore2 && (
        <Box display="flex" justifyContent="center" p="30px">
          <Button
            onClick={() =>  loadMoreCourses()}
            variant="contained"
            sx={{
              backgroundColor: colors.yellow[100],
              color: colors.white[100],
              "&:hover": { backgroundColor: colors.yellow[200] }
            }}
          >
            Load more
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Courses;
 