import { useTheme, Box, Typography, Divider, Chip, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import { tokens } from "../theme";

import CodeIcon from '@mui/icons-material/Code';
import BarChartIcon from '@mui/icons-material/BarChart';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SettingsIcon from '@mui/icons-material/Settings';
import HtmlIcon from '@mui/icons-material/Html';
import CssIcon from '@mui/icons-material/Css';
import JavascriptIcon from '@mui/icons-material/Javascript';
import PhpIcon from '@mui/icons-material/Php';

const Home = () => {
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const navigate = useNavigate();


     const handleClick = () => {
          console.info('You clicked the Chip.');
     };
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
                              <Typography variant="h5">total likes: <span style={{color:colors.purple[500]}}>25</span></Typography>
                              <Button variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100]  }}>View likes</Button>
                              <Typography variant="h5">total Comments: <span style={{color:colors.purple[500]}}>12</span></Typography>
                              <Button variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100]  }}>View comments</Button>
                              <Typography variant="h5">total Playlists: <span style={{color:colors.purple[500]}}>4</span></Typography>
                              <Button variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100]  }}>View Playlists</Button>
                             

                              
                              
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
                              <Typography variant="h4" sx={{marginBottom:"10px",width:"100%"}}>Top Categories</Typography>
                               <Chip sx={{width:"fit-content"}} onClick={handleClick} icon={<CodeIcon />} label="development" />
                               <Chip sx={{width:"fit-content"}} onClick={handleClick} icon={<BarChartIcon />} label="business" />
                               <Chip sx={{width:"fit-content"}} onClick={handleClick} icon={<ModeEditIcon />} label="design" />
                               <Chip sx={{width:"fit-content"}} onClick={handleClick} icon={<TrendingUpIcon />} label="marketing" />
                               <Chip sx={{width:"fit-content"}} onClick={handleClick} icon={<MusicNoteIcon />} label="music" />
                               <Chip sx={{width:"fit-content"}} onClick={handleClick} icon={<PhotoCameraIcon />} label="photography" />
                               <Chip sx={{width:"fit-content"}} onClick={handleClick} icon={<SettingsIcon />} label="software" />
                             

                              
                              
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
                              <Typography variant="h4" sx={{marginBottom:"10px",width:"100%"}}>Pupular Topics</Typography>
                                
                               <Chip sx={{width:"fit-content"}} onClick={handleClick} icon={<HtmlIcon />} label="HTML" />
                               <Chip sx={{width:"fit-content"}} onClick={handleClick} icon={<JavascriptIcon />} label="javascript" />
                               <Chip sx={{width:"fit-content"}} onClick={handleClick} icon={<CssIcon />} label="CSS" />
                               <Chip sx={{width:"fit-content"}} onClick={handleClick} icon={<PhpIcon />} label="PHP" />
                             

                              
                              
                         </Box>
                          
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
                              <Button variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100]  }}>get started</Button>
                              

                              
                              
                         </Box>
                         
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
                   
                     
                    <Card sx={{ maxWidth: "100%" }}>
                         
                         
                         <CardContent>
                              <Box display={"flex"} marginBottom={"20px"} gap={"10px"} >
                                   <Avatar alt="Ardit korko" src="src/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="src/assets/testImages/thumb-1.png"
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
                                   <Avatar alt="Ardit korko" src="src/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="src/assets/testImages/thumb-2.png"
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
                                   <Avatar alt="Ardit korko" src="src/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="src/assets/testImages/thumb-3.png"
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
                                   <Avatar alt="Ardit korko" src="src/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="src/assets/testImages/thumb-4.png"
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
                                   <Avatar alt="Ardit korko" src="src/assets/testImages/pic-1.jpg"  /> 
                                   <Box>
                                        <Typography variant="h5">Ardit korko</Typography>
                                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                                   </Box>
                              </Box>

                              <Box position={"relative"}>
                                    <CardMedia
                                        sx={{ height: 260 }}
                                        image="src/assets/testImages/thumb-5.png"
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