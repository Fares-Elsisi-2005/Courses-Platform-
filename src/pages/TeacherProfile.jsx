import {useTheme, Box,Button ,Typography,Divider,Avatar  } from "@mui/material";
import { tokens } from "../theme";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from "react-router-dom";
 

const TeacherProfile = () => {
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const navigate = useNavigate();
     return (
          <Box>
               <Typography variant="h3">Profile Details</Typography>
               <Divider sx={{ mt: "15px", mb: "25px" }} />
               <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} sx={{backgroundColor:colors.primary[200],borderRadius:"8px",p:"20px"}}>
                    <Box display={"flex"} flexDirection={"column"} marginBottom={"20px"} gap={"10px"} textAlign={"center"}  >
                         <Avatar alt="Ardit korko" src="/src/assets/testImages/pic-1.jpg" sx={{ width: 56, height: 56,alignSelf:"center" }}  /> 
                         <Box>
                              <Typography variant="h5">Ardit korko</Typography>
                              <Typography variant="h6" sx={{color:colors.primary[300],}}>developer</Typography>
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
                              <Typography variant="h5" sx={{color:colors.grey[400]}} >total playlists: <span style={{color:colors.purple[500],fontWeight:"bold",fontSize:"20px"}}>3</span></Typography>
                         </Box>
                         
                         <Box backgroundColor={colors.primary[100]} p={"20px"} borderRadius={"7px"} textAlign={"center"}>
                              <Typography variant="h5" sx={{color:colors.grey[400]}} >total videos: <span style={{color:colors.purple[500],fontWeight:"bold",fontSize:"20px"}}>39</span></Typography>
                         </Box>
                         
                         <Box backgroundColor={colors.primary[100]} p={"20px"} borderRadius={"7px"} textAlign={"center"}>
                              <Typography variant="h5" sx={{color:colors.grey[400]}} >total  likes: <span style={{color:colors.purple[500],fontWeight:"bold",fontSize:"20px"}}>124</span></Typography>
                         </Box>
                         
                         <Box backgroundColor={colors.primary[100]} p={"20px"} borderRadius={"7px"} textAlign={"center"}>
                              <Typography variant="h5" sx={{color:colors.grey[400]}} >total comments: <span style={{color:colors.purple[500],fontWeight:"bold",fontSize:"20px"}}>50</span></Typography>
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
                   
                     
                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="/src/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="/src/assets/testImages/thumb-1.png"
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
                                        <Typography variant="h6">10 videos</Typography>
                                        
                                    </Box>


                              </Box>
                              <Typography variant="h5" component="div" mt={"10px"}>
                                   complete HTML tutorial
                              </Typography>
                               
                         </CardContent>
                         <CardActions>
                              <Button onClick={()=>{navigate("/Courses")}}  variant="contained" sx={{backgroundColor:colors.purple[500],
                                    width:"fit-content", 
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.purple[600]
                                    },
                                    transition:"all 0.3s"  }}>View Playlists</Button>
                          
                         </CardActions>
                    </Card>
                     
                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="/src/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="/src/assets/testImages/thumb-2.png"
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
                                        <Typography variant="h6">10 videos</Typography>
                                        
                                    </Box>


                              </Box>
                              <Typography variant="h5" component="div" mt={"10px"}>
                                   complete HTML tutorial
                              </Typography>
                               
                         </CardContent>
                         <CardActions>
                              <Button onClick={()=>{navigate("/Courses")}}  variant="contained" sx={{backgroundColor:colors.purple[500],
                                    width:"fit-content", 
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.purple[600]
                                    },
                                    transition:"all 0.3s"  }}>View Playlists</Button>
                          
                         </CardActions>
                    </Card>
                     
                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="/src/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="/src/assets/testImages/thumb-3.png"
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
                                        <Typography variant="h6">10 videos</Typography>
                                        
                                    </Box>


                              </Box>
                              <Typography variant="h5" component="div" mt={"10px"}>
                                   complete HTML tutorial
                              </Typography>
                               
                         </CardContent>
                         <CardActions>
                              <Button onClick={()=>{navigate("/Courses")}}  variant="contained" sx={{backgroundColor:colors.purple[500],
                                    width:"fit-content", 
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.purple[600]
                                    },
                                    transition:"all 0.3s"  }}>View Playlists</Button>
                          
                         </CardActions>
                    </Card>
                     
                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="/src/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="/src/assets/testImages/thumb-4.png"
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
                                        <Typography variant="h6">10 videos</Typography>
                                        
                                    </Box>


                              </Box>
                              <Typography variant="h5" component="div" mt={"10px"}>
                                   complete HTML tutorial
                              </Typography>
                               
                         </CardContent>
                         <CardActions>
                              <Button onClick={()=>{navigate("/Courses")}}  variant="contained" sx={{backgroundColor:colors.purple[500],
                                    width:"fit-content", 
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.purple[600]
                                    },
                                    transition:"all 0.3s"  }}>View Playlists</Button>
                          
                         </CardActions>
                    </Card>
                     
                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="/src/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="/src/assets/testImages/thumb-5.png"
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
                                        <Typography variant="h6">10 videos</Typography>
                                        
                                    </Box>


                              </Box>
                              <Typography variant="h5" component="div" mt={"10px"}>
                                   complete HTML tutorial
                              </Typography>
                               
                         </CardContent>
                         <CardActions>
                              <Button onClick={()=>{navigate("/Courses")}}  variant="contained" sx={{backgroundColor:colors.purple[500],
                                    width:"fit-content", 
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.purple[600]
                                    },
                                    transition:"all 0.3s"  }}>View Playlists</Button>
                          
                         </CardActions>
                    </Card>
                     
                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="/src/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="/src/assets/testImages/thumb-6.png"
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
                                        <Typography variant="h6">10 videos</Typography>
                                        
                                    </Box>


                              </Box>
                              <Typography variant="h5" component="div" mt={"10px"}>
                                   complete HTML tutorial
                              </Typography>
                               
                         </CardContent>
                         <CardActions>
                              <Button onClick={()=>{navigate("/Courses")}}  variant="contained" sx={{backgroundColor:colors.purple[500],
                                    width:"fit-content", 
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.purple[600]
                                    },
                                    transition:"all 0.3s"  }}>View Playlists</Button>
                          
                         </CardActions>
                    </Card>
                     
                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="/src/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="/src/assets/testImages/thumb-7.png"
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
                                        <Typography variant="h6">10 videos</Typography>
                                        
                                    </Box>


                              </Box>
                              <Typography variant="h5" component="div" mt={"10px"}>
                                   complete HTML tutorial
                              </Typography>
                               
                         </CardContent>
                         <CardActions>
                              <Button onClick={()=>{navigate("/Courses")}}  variant="contained" sx={{backgroundColor:colors.purple[500],
                                    width:"fit-content", 
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.purple[600]
                                    },
                                    transition:"all 0.3s"  }}>View Playlists</Button>
                          
                         </CardActions>
                    </Card>
                     
                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="/src/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="/src/assets/testImages/thumb-8.png"
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
                                        <Typography variant="h6">10 videos</Typography>
                                        
                                    </Box>


                              </Box>
                              <Typography variant="h5" component="div" mt={"10px"}>
                                   complete HTML tutorial
                              </Typography>
                               
                         </CardContent>
                         <CardActions>
                              <Button onClick={()=>{navigate("/Courses")}}  variant="contained" sx={{backgroundColor:colors.purple[500],
                                    width:"fit-content", 
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.purple[600]
                                    },
                                    transition:"all 0.3s"  }}>View Playlists</Button>
                          
                         </CardActions>
                    </Card>
                     
                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="/src/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="/src/assets/testImages/thumb-9.png"
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
                                        <Typography variant="h6">10 videos</Typography>
                                        
                                    </Box>


                              </Box>
                              <Typography variant="h5" component="div" mt={"10px"}>
                                   complete HTML tutorial
                              </Typography>
                               
                         </CardContent>
                         <CardActions>
                              <Button onClick={()=>{navigate("/Courses")}}  variant="contained" sx={{backgroundColor:colors.purple[500],
                                    width:"fit-content", 
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.purple[600]
                                    },
                                    transition:"all 0.3s"  }}>View Playlists</Button>
                          
                         </CardActions>
                    </Card>
                     
                
                    </Box>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} p={"30px"}  >
                         <Button  onClick={()=>{navigate("/Courses")}}  variant="contained" sx={{backgroundColor:colors.yellow[100],
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
 

export default TeacherProfile;