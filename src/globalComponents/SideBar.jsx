import {useTheme, Box,Button ,List,ListItem,ListItemButton,ListItemIcon ,ListItemText,Typography ,Avatar   } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SchoolIcon from '@mui/icons-material/School';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getimageUrl, } from "./../services/serviceProvider";
 
import { useAuth } from "../Contexts/AuthContext";

import {useFirebaseLogin} from "../hooks/useFirebaseLogin"


 
const SideBar = ({ isCollapsed, setIsCollapsed }) => {
     
     const { user } = useAuth();
     
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const isSmallScreen = useMediaQuery('(max-width:900px)');
     const ismobile = useMediaQuery('(max-width:500px)');
     const navigate = useNavigate();
     
     const { loading, loginWithGoogle } = useFirebaseLogin();
     const handleClickLogin = () => {
     
          loginWithGoogle();
     
     }

    
     return (
          <Box maxWidth={ismobile?"200":"360px"} sx={{
               transition: "width 0.4s ease",
               position: isSmallScreen?"fixed":"sticky", 
               top:"0",
               width:ismobile? isCollapsed ? "0px" :  "200px":isCollapsed ? "0px" :  "360px", 
               overflow:"hidden",
               height:"100vh", 
               backgroundColor: colors.primary[200],
               zIndex:"20"
              
          }}  >
               {isSmallScreen ?
                    <Box display={"flex"} alignItems={"center"} justifyContent={"end"}>
                    <IconButton onClick={ ()=>{setIsCollapsed(true)} } sx={{ float: "right" }}><CloseIcon /></IconButton>
               </Box> :  ""}
               
              {user?.user?  <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} p={"25px"} gap={"10px"}>
                  
                    <Avatar
        alt="profile image"
        src= {getimageUrl(user?.user.image)}
        sx={{ width: 56, height: 56 }}
      />
                    <Typography variant="h3" sx={{color:colors.primary[300],whiteSpace:"nowrap"}}>{user?.user.name}</Typography>
                    <Typography variant="h5" sx={{ color: colors.grey[400] }}>{user?.role}</Typography>
                    <Button onClick={()=>{navigate(`/UserProfile/${user.user.userId}`)}} variant="contained" sx={{backgroundColor:colors.purple[500], width:"180px", color:colors.white[100]  }}>View Profile</Button>
               </Box>:
               <Box sx={{
                              backgroundColor: colors.primary[200],
                              borderRadius: "10px",
                              padding: "20px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                              height: "fit-content",
                              justifyContent:"center"
                              , alignItems:"center"
                              
                              
                         }}>
                              <Typography variant="h4" sx={{marginBottom:"10px"}}>login now</Typography>
                              <Button loading={loading} onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleClickLogin();
                              }} variant="contained" sx={{backgroundColor:colors.orange[100], width:"fit-content", color:colors.white[100]  }}>Login</Button>
                                                            

                              
                              
                         </Box> 
               }
               <List>

                    <ListItem disablePadding >
                         <ListItemButton onClick={()=>{navigate("/")}}   sx={{padding:"20px 10px"}}>
                                   <ListItemIcon>
                                        <HomeIcon sx={{color:colors.purple[500]}} />
                                   </ListItemIcon>
                              <ListItemText sx={{color:colors.grey[400]}} primary="home" />
                       </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding >
                         <ListItemButton onClick={()=>{navigate("/About")}}  sx={{padding:"20px 10px"}}>
                                   <ListItemIcon>
                                        <QuestionMarkIcon sx={{color:colors.purple[500]}} />
                                   </ListItemIcon>
                              <ListItemText sx={{color:colors.grey[400]}} primary="about" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding >
                         <ListItemButton onClick={()=>{navigate("/Courses")}}  sx={{padding:"20px 10px"}}>
                                   <ListItemIcon>
                                        <SchoolIcon sx={{color:colors.purple[500]}} />
                                   </ListItemIcon>
                              <ListItemText sx={{color:colors.grey[400]}} primary="courses" />
                         </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding >
                         <ListItemButton onClick={()=>{navigate("/Teachers")}}  sx={{padding:"20px 10px"}}>
                                   <ListItemIcon>
                                        <CastForEducationIcon sx={{color:colors.purple[500]}} />
                                   </ListItemIcon>
                              <ListItemText sx={{color:colors.grey[400]}} primary="teachers" />
                         </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding >
                         <ListItemButton onClick={()=>{navigate("/ContactUs")}}  sx={{padding:"20px 10px"}}>
                                   <ListItemIcon>
                                        <PermPhoneMsgIcon sx={{color:colors.purple[500]}} />
                                   </ListItemIcon>
                              <ListItemText sx={{color:colors.grey[400]}} primary="contact us" />
                         </ListItemButton>
                    </ListItem>

               </List>
          
          </Box>
     )
}
 

export default SideBar;
