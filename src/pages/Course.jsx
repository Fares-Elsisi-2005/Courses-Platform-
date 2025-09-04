import { useTheme, Box, Button, Typography, Divider, Avatar } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useState } from "react";

const Course = () => {
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const navigate = useNavigate();
     const [isCourseSaved, setIsCourseSaved] = useState(false);
     

     return ( 
          <Box>
               <Box mb={"40px"}>
                    <Typography variant="h3">Playlist Details</Typography>
                    <Divider sx={{ margin: "15px 0px" }} />
                    <Box borderRadius={"10px"} p={"20px"}
                         backgroundColor={colors.primary[200]}> 
                         
                         <Button  onClick={()=>{setIsCourseSaved(!isCourseSaved)}} sx={{backgroundColor:colors.primary[100],mb:"20px"}}>
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
                                             <img style={{width:"100%", borderRadius:"10px" }} src="src/assets/testImages/post-1-1.png" alt="" />
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
                                                  <Typography variant="h6">10 videos</Typography>
                                                  
                                             </Box>
                                        </Box>
                                   
                              </Box>
                              <Box alignSelf={"start"}>
                                   <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                             <Avatar alt="Ardit korko" src="src/assets/testImages/pic-1.jpg"  /> 
                                             <Box>
                                                  <Typography variant="h5">Ardit korko</Typography>
                                                  <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                             </Box>
                                   </Box>
                                   <Box  >
                                        <Typography variant="h4" sx={{marginBottom:"10px"}}>Complete HTML Tutorial</Typography>
                                        <Typography variant="body1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos iure eius alias accusantium excepturi molestias officiis, at enim fugit ducimus eos quaerat, quisquam, provident unde! Amet quasi iste veniam illo.</Typography>
                                        <Button onClick={()=>{navigate("/TeacherProfile/20")}} variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100], margin:"20px 0"  }}>View Profile</Button>
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
                   
                     
                    <Card  sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                               

                              <Box onClick={()=>{navigate("/Video")}}
                                   position={"relative"} sx={{ cursor: "pointer",overflow:"hidden" }}>
                                     
                                   <img
                                        src="src/assets/testImages/post-1-1.png"
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
                                   complete HTML tutorial
                              </Typography>
                               
                         </CardContent>
                      
                    </Card>
                      
                      
                     
                    <Card  sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                               

                              <Box onClick={()=>{navigate("/Video")}}
                                   position={"relative"} sx={{ cursor: "pointer",overflow:"hidden" }}>
                                     
                                   <img
                                        src="src/assets/testImages/post-1-2.png"
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
                                   complete HTML tutorial
                              </Typography>
                               
                         </CardContent>
                      
                    </Card>
                      
                      
                     
                    <Card  sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                               

                              <Box onClick={()=>{navigate("/Video")}}
                                   position={"relative"} sx={{ cursor: "pointer",overflow:"hidden" }}>
                                     
                                   <img
                                        src="src/assets/testImages/post-1-3.png"
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
                                   complete HTML tutorial
                              </Typography>
                               
                         </CardContent>
                      
                    </Card>
                      
                      
                     
                    <Card  sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                               

                              <Box onClick={()=>{navigate("/Video")}}
                                   position={"relative"} sx={{ cursor: "pointer",overflow:"hidden" }}>
                                     
                                   <img
                                        src="src/assets/testImages/post-1-4.png"
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
                                   complete HTML tutorial
                              </Typography>
                               
                         </CardContent>
                      
                    </Card>
                      
                      
                     
                    <Card  sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                               

                              <Box onClick={()=>{navigate("/Video")}}
                                   position={"relative"} sx={{ cursor: "pointer",overflow:"hidden" }}>
                                     
                                   <img
                                        src="src/assets/testImages/post-1-5.png"
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
                                   complete HTML tutorial
                              </Typography>
                               
                         </CardContent>
                      
                    </Card>
                      
                      
                     
                    <Card  sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                               

                              <Box onClick={()=>{navigate("/Video")}}
                                   position={"relative"} sx={{ cursor: "pointer",overflow:"hidden" }}>
                                     
                                   <img
                                        src="src/assets/testImages/post-1-6.png"
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
                                   complete HTML tutorial
                              </Typography>
                               
                         </CardContent>
                      
                    </Card>
                      
                      
                    

               </Box>


          </Box>
     )
}
 

export default Course;
