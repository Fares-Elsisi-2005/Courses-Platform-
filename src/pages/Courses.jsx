import { useTheme, Box, Typography, Divider, Chip, Stack, Button } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import { tokens } from "../theme";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Courses = () => {
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const divider = useRef(null);
     const navigate = useNavigate();



     useEffect(() => {
          divider.current.scrollIntoView()
     },[])
     return ( 
          <Box>
                    <Typography variant="h3">Our Coures</Typography>
                    <Divider ref={divider} sx={{ margin: "15px 0px" }} />
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
                                   <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="/assets/testImages/thumb-1.png"
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
                              <Button onClick={()=>{navigate("/Course")}} variant="contained" sx={{backgroundColor:colors.purple[500],
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
                                   <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="/assets/testImages/thumb-2.png"
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
                              <Button onClick={()=>{navigate("/Course")}} variant="contained" sx={{backgroundColor:colors.purple[500],
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
                                   <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="/assets/testImages/thumb-3.png"
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
                              <Button onClick={()=>{navigate("/Course")}} variant="contained" sx={{backgroundColor:colors.purple[500],
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
                                   <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="/assets/testImages/thumb-4.png"
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
                              <Button onClick={()=>{navigate("/Course")}} variant="contained" sx={{backgroundColor:colors.purple[500],
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
                                   <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="/assets/testImages/thumb-5.png"
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
                              <Button onClick={()=>{navigate("/Course")}} variant="contained" sx={{backgroundColor:colors.purple[500],
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
                                   <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="/assets/testImages/thumb-6.png"
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
                              <Button onClick={()=>{navigate("/Course")}} variant="contained" sx={{backgroundColor:colors.purple[500],
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
                                   <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="/assets/testImages/thumb-7.png"
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
                              <Button onClick={()=>{navigate("/Course")}} variant="contained" sx={{backgroundColor:colors.purple[500],
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
                                   <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="/assets/testImages/thumb-8.png"
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
                              <Button onClick={()=>{navigate("/Course")}} variant="contained" sx={{backgroundColor:colors.purple[500],
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
                                   <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="/assets/testImages/thumb-9.png"
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
                              <Button onClick={()=>{navigate("/Course")}} variant="contained" sx={{backgroundColor:colors.purple[500],
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
                         <Button onClick={()=>{navigate("/Course")}} variant="contained" sx={{backgroundColor:colors.yellow[100],
                         width: "fit-content", 
                                   
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.yellow[200]
                                    },
                         transition: "all 0.3s"
                    }}>
                         load more
                    </Button>
                    </Box>
               </Box>
     )
}
 

export default Courses;