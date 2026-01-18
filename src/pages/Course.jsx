import { useTheme, Box, Button, Typography, Divider, Avatar } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { tokens } from "../theme";
import { useNavigate,  useParams } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useState,useEffect,useMemo } from "react";
import {formatTimestamp,getimageUrl,  } from "./../services/serviceProvider";
 
import { useAuth } from "../Contexts/AuthContext";
import { useGetTeacherCourses } from "../hooks/useGetCoursesById";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useGetUser } from "../hooks/useGetUser";

 
const Course = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

 const courseIds = useMemo(() => [id], [id]);
  const { courses, loading, error } = useGetTeacherCourses(courseIds);
  const { updateUserData } = useUpdateUser();
   
  const { userData  } = useGetUser(courses[0]?.teacherId);
 
  
    // 🔹 real async data handling
  console.log("user that make : ", user)
 
const { savedPlaylists } = user.user?user.user: [];
   

  const [isCourseSaved, setIsCourseSaved] = useState(false);

  // ----------------------------------
  // Sync saved state AFTER course loads
  // ----------------------------------
  useEffect(() => {
  if (courses.length > 0) {
    setIsCourseSaved(savedPlaylists?.includes(courses[0].id));
  }
}, [courses, savedPlaylists]);

  // ----------------------------------
  // Guards
  // ----------------------------------
  if (loading) {
    return <Typography>Loading course...</Typography>;
  }

  if (error || courses.length === 0) {
    return <Typography>Course not found</Typography>;
  }

  const course = courses[0];
   

  // ----------------------------------
  // Handlers
  // ----------------------------------
  const handleCourseSaved = () => {
    setIsCourseSaved((prev) => !prev);
    const updatedUser = { ...user.user, savedPlaylists: !isCourseSaved ? [...user.user.savedPlaylists, course.id] : user.user.savedPlaylists.filter((courseId) => courseId !== course.id) };
    updateUserData(updatedUser);
    console.log("current user from course page", updatedUser)
  };

  return (
    <Box>
      <Typography variant="h3">Playlist Details</Typography>
      <Divider sx={{ my: 2 }} />

      

      <Box p={3} borderRadius="10px" bgcolor={colors.primary[200]}>
        
        {user.user && (
        <Button
          onClick={handleCourseSaved}
          sx={{ backgroundColor: colors.primary[100], mb: 2 }}
        >
          {isCourseSaved ? (
            <BookmarkIcon sx={{ color: colors.purple[500], mr: 1 }} />
          ) : (
            <BookmarkBorderIcon sx={{ color: colors.primary[300], mr: 1 }} />
          )}
          <Typography>
            {isCourseSaved ? "Saved" : "Save Playlist"}
          </Typography>
        </Button>
      )}

        <Box display="grid" gap={3} gridTemplateColumns="1fr 1fr">
          <Box>
            <img
              src={getimageUrl(course.image)}
              alt=""
              style={{ width: "100%", borderRadius: 10 }}
            />
          </Box>

          <Box>
            <Box display="flex" gap={2} mb={2}>
              <Avatar src={getimageUrl(userData?.image)} />
              <Box>
                <Typography variant="h5">{userData?.name}</Typography>
                <Typography variant="h6" color={colors.primary[300]}>
                  {formatTimestamp(course.createdAt) }
                </Typography>
              </Box>
            </Box>

            <Typography variant="h4">{course.title}</Typography>
            <Typography>{course.description}</Typography>

            <Button
              onClick={() =>
                navigate(`/UserProfile/${course.teacherId}`)
              }
              variant="contained"
              sx={{ mt: 2, backgroundColor: colors.purple[500] }}
            >
              View Profile
            </Button>
          </Box>
        </Box>
      </Box>
      {/* Videos */}
      <Typography variant="h3" mt={4}>
        Playlist Videos
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Box display="grid" gap={2} gridTemplateColumns="repeat(3, 1fr)">
        {course.playlist.map((video) => (
          <Card key={video.videoId}>
            <CardContent>
              <Box
                onClick={() =>
                  navigate(`/Video/${course.id}/${video.videoId}`)
                }
                sx={{ cursor: "pointer",position:"relative", }}
              >
                <img
                  src={getimageUrl(video.thumbImage)}
                  alt=""
                  style={{ width: "100%" }}
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

              <Typography variant="h5" mt={1}>
                {video.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Course;
 