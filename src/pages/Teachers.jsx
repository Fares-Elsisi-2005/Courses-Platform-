import {useTheme, Box,Button ,Typography,Divider,InputBase,IconButton   } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';

const Teachers = () => {
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const navigate = useNavigate();
     
     return ( 
          <Box>
               <Typography variant="h3">Expert Teachers</Typography>
               <Divider sx={{ mt:"15px",mb:"25px"}} />
               <Box display="flex" backgroundColor={colors.primary[200]} borderRadius="3px" flex={"1"}   maxWidth={"100%"} mb={"20px"}>
                               
                           <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search tutors.." /> 
                               
                           <IconButton type="button" sx={{p:1}}>
                               <SearchIcon/>
                           </IconButton>
                               
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
                              <Button variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100], mb:"20px"  }}>Get started</Button>
                              

                              
                              
                    </Box>

                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>developer</Typography>

                                   </Box>
                              </Box>

                              <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                              <Typography variant="h5" sx={{color:colors.grey[400]}} >total playlists: <span style={{color:colors.purple[500]}}>3</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total videos: <span style={{color:colors.purple[500]}}>39</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total likes: <span style={{color:colors.purple[500]}}>1324</span></Typography>
                                   

                              </Box>
                             
                               
                         </CardContent>
                         <CardActions>
                              <Button onClick={()=>{navigate("/TeacherProfile/10")}} variant="contained" sx={{backgroundColor:colors.purple[500],
                                    width:"fit-content", 
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.purple[600]
                                    },
                                    transition:"all 0.3s"  }}>View profile</Button>
                          
                         </CardActions>
                    </Card>

                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>developer</Typography>

                                   </Box>
                              </Box>

                              <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                              <Typography variant="h5" sx={{color:colors.grey[400]}} >total playlists: <span style={{color:colors.purple[500]}}>3</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total videos: <span style={{color:colors.purple[500]}}>39</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total likes: <span style={{color:colors.purple[500]}}>1324</span></Typography>
                                   

                              </Box>
                             
                               
                         </CardContent>
                         <CardActions>
                              <Button onClick={()=>{navigate("/TeacherProfile/10")}} variant="contained" sx={{backgroundColor:colors.purple[500],
                                    width:"fit-content", 
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.purple[600]
                                    },
                                    transition:"all 0.3s"  }}>View profile</Button>
                          
                         </CardActions>
                    </Card>

                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>developer</Typography>

                                   </Box>
                              </Box>

                              <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                              <Typography variant="h5" sx={{color:colors.grey[400]}} >total playlists: <span style={{color:colors.purple[500]}}>3</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total videos: <span style={{color:colors.purple[500]}}>39</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total likes: <span style={{color:colors.purple[500]}}>1324</span></Typography>
                                   

                              </Box>
                             
                               
                         </CardContent>
                         <CardActions>
                              <Button onClick={()=>{navigate("/TeacherProfile/10")}} variant="contained" sx={{backgroundColor:colors.purple[500],
                                    width:"fit-content", 
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.purple[600]
                                    },
                                    transition:"all 0.3s"  }}>View profile</Button>
                          
                         </CardActions>
                    </Card>

                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>developer</Typography>

                                   </Box>
                              </Box>

                              <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                              <Typography variant="h5" sx={{color:colors.grey[400]}} >total playlists: <span style={{color:colors.purple[500]}}>3</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total videos: <span style={{color:colors.purple[500]}}>39</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total likes: <span style={{color:colors.purple[500]}}>1324</span></Typography>
                                   

                              </Box>
                             
                               
                         </CardContent>
                         <CardActions>
                              <Button onClick={()=>{navigate("/TeacherProfile/10")}} variant="contained" sx={{backgroundColor:colors.purple[500],
                                    width:"fit-content", 
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.purple[600]
                                    },
                                    transition:"all 0.3s"  }}>View profile</Button>
                          
                         </CardActions>
                    </Card>

                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>developer</Typography>

                                   </Box>
                              </Box>

                              <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                              <Typography variant="h5" sx={{color:colors.grey[400]}} >total playlists: <span style={{color:colors.purple[500]}}>3</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total videos: <span style={{color:colors.purple[500]}}>39</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total likes: <span style={{color:colors.purple[500]}}>1324</span></Typography>
                                   

                              </Box>
                             
                               
                         </CardContent>
                         <CardActions>
                              <Button onClick={()=>{navigate("/TeacherProfile/10")}} variant="contained" sx={{backgroundColor:colors.purple[500],
                                    width:"fit-content", 
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.purple[600]
                                    },
                                    transition:"all 0.3s"  }}>View profile</Button>
                          
                         </CardActions>
                    </Card>

                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>developer</Typography>

                                   </Box>
                              </Box>

                              <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                              <Typography variant="h5" sx={{color:colors.grey[400]}} >total playlists: <span style={{color:colors.purple[500]}}>3</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total videos: <span style={{color:colors.purple[500]}}>39</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total likes: <span style={{color:colors.purple[500]}}>1324</span></Typography>
                                   

                              </Box>
                             
                               
                         </CardContent>
                         <CardActions>
                              <Button onClick={()=>{navigate("/TeacherProfile/10")}} variant="contained" sx={{backgroundColor:colors.purple[500],
                                    width:"fit-content", 
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.purple[600]
                                    },
                                    transition:"all 0.3s"  }}>View profile</Button>
                          
                         </CardActions>
                    </Card>

                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>developer</Typography>

                                   </Box>
                              </Box>

                              <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                              <Typography variant="h5" sx={{color:colors.grey[400]}} >total playlists: <span style={{color:colors.purple[500]}}>3</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total videos: <span style={{color:colors.purple[500]}}>39</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total likes: <span style={{color:colors.purple[500]}}>1324</span></Typography>
                                   

                              </Box>
                             
                               
                         </CardContent>
                         <CardActions>
                              <Button onClick={()=>{navigate("/TeacherProfile/10")}} variant="contained" sx={{backgroundColor:colors.purple[500],
                                    width:"fit-content", 
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.purple[600]
                                    },
                                    transition:"all 0.3s"  }}>View profile</Button>
                          
                         </CardActions>
                    </Card>

                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>developer</Typography>

                                   </Box>
                              </Box>

                              <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                              <Typography variant="h5" sx={{color:colors.grey[400]}} >total playlists: <span style={{color:colors.purple[500]}}>3</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total videos: <span style={{color:colors.purple[500]}}>39</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total likes: <span style={{color:colors.purple[500]}}>1324</span></Typography>
                                   

                              </Box>
                             
                               
                         </CardContent>
                         <CardActions>
                              <Button onClick={()=>{navigate("/TeacherProfile/10")}} variant="contained" sx={{backgroundColor:colors.purple[500],
                                    width:"fit-content", 
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.purple[600]
                                    },
                                    transition:"all 0.3s"  }}>View profile</Button>
                          
                         </CardActions>
                    </Card>

                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>developer</Typography>

                                   </Box>
                              </Box>

                              <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                              <Typography variant="h5" sx={{color:colors.grey[400]}} >total playlists: <span style={{color:colors.purple[500]}}>3</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total videos: <span style={{color:colors.purple[500]}}>39</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total likes: <span style={{color:colors.purple[500]}}>1324</span></Typography>
                                   

                              </Box>
                             
                               
                         </CardContent>
                         <CardActions>
                              <Button onClick={()=>{navigate("/TeacherProfile/10")}} variant="contained" sx={{backgroundColor:colors.purple[500],
                                    width:"fit-content", 
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.purple[600]
                                    },
                                    transition:"all 0.3s"  }}>View profile</Button>
                          
                         </CardActions>
                    </Card>

                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>developer</Typography>

                                   </Box>
                              </Box>

                              <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                              <Typography variant="h5" sx={{color:colors.grey[400]}} >total playlists: <span style={{color:colors.purple[500]}}>3</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total videos: <span style={{color:colors.purple[500]}}>39</span></Typography>
                              <Typography variant="h5" sx={{color:colors.grey[400]}}>total likes: <span style={{color:colors.purple[500]}}>1324</span></Typography>
                                   

                              </Box>
                             
                               
                         </CardContent>
                         <CardActions>
                              <Button onClick={()=>{navigate("/TeacherProfile/10")}} variant="contained" sx={{backgroundColor:colors.purple[500],
                                    width:"fit-content", 
                                    color:colors.white[100],
                                    textTransform:"capitalize",
                                    "&:hover":{
                                        backgroundColor:colors.purple[600]
                                    },
                                    transition:"all 0.3s"  }}>View profile</Button>
                          
                         </CardActions>
                    </Card>
               </Box>
                    
          </Box>
     )
}
 

export default Teachers;