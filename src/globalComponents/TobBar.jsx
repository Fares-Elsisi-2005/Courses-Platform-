
import { Box,Button, IconButton, useTheme,Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../theme";
import {InputBase} from "@mui/material";
import LightModeOutLinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutLinedIcon from "@mui/icons-material/DarkModeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from '@mui/icons-material/Login';
import useMediaQuery from '@mui/material/useMediaQuery';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
 
import { useAuth } from "../Contexts/AuthContext";

import {useFirebaseLogin} from "../hooks/useFirebaseLogin"

import {getimageUrl} from "./../services/serviceProvider";

import { auth } from "../config/firebase-config";
import { signOut } from "firebase/auth";

import SearchCoursesBar from "../components/SearchCoursesBar";
 


const TobBar = ({ isCollapsed, setIsCollapsed }) => {

  const { loginWithGoogle } = useFirebaseLogin();

  const { user, dispatchUser } = useAuth();
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const ismobile = useMediaQuery('(max-width:450px)');
  const [isSearchBar, SetIsSearchBar] = useState(false);
  const navigate = useNavigate();
 

  /* drop down */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  
  const handleClickLogin = () => {
    handleClose();
    loginWithGoogle();
    
  }
  const handleClickSignUp =  () => {
    handleClose();
    
     navigate("/SignUp");
   
     
  }
  const handleClickLogout = async () => {
    await signOut(auth);  
    handleClose();
    dispatchUser({ type: "LOGOUT" });
    window.location.reload(); 

    
     
  }
     
    return (
        
        <Box
            sx={{
                position: "sticky",
                top: "0px",
                zIndex: "10",
            }}
        >
                <Box display="flex"
            justifyContent="space-between"
            p={2}
            sx={{
                 
                backgroundColor: colors.primary[200], 
                boxShadow: "0px 4px 6px -2px rgba(0, 0, 0, 0.2)",
                 
            }}
        >
            <Typography variant="h2" sx={{color:colors.primary[300]}}>Educa.</Typography>
            
           
        {/* SEARCH BAR */}
         
          
          {!ismobile && (
            <Box
              display="flex"
              backgroundColor={colors.primary[100]}
              borderRadius="3px"
              flex="1"
              m="0px 10px"
              maxWidth="700px"
              position="relative"
            >
            <SearchCoursesBar/>

            </Box>)}
            

        {/* ICONS */}
            <Box display="flex">
                <Tooltip title="sidebar">
                    <IconButton onClick={() => { setIsCollapsed(!isCollapsed) }}> <MenuOutlinedIcon /> </IconButton>
                </Tooltip>
               {ismobile? <Tooltip title="seacrch for course">
                    <IconButton onClick={()=>{SetIsSearchBar(!isSearchBar)}} > <SearchIcon /> </IconButton>
                </Tooltip>:<></>}
                 <Tooltip title="Account">
          
                    <IconButton
                        onClick={handleClick}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <PersonOutlined />
                    </IconButton>
                </Tooltip>
                    
                <Tooltip title="theme">
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === "dark" ?
                            (<DarkModeOutLinedIcon />) :
                            (<LightModeOutLinedIcon />)
                            
                        }
                    </IconButton>
                </Tooltip>
                

            </Box>
            

        
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
       {user?.user? <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} p={"25px"} gap={"10px"}>
                <img style={{width:"80px",height:"80px",borderRadius:"50%"}} src= { user?.user.image} alt="profile image" /> 
                <Typography variant="h3" sx={{color:colors.primary[300],whiteSpace:"nowrap"}}>{user?.user.name}</Typography>
                <Typography variant="h5" sx={{ color: colors.grey[400] }}>{user?.role}</Typography>
                <Button onClick={()=>{navigate(`/UserProfile/${user.user.userId}`)}} variant="contained" sx={{backgroundColor:colors.purple[500], width:"180px", color:colors.white[100]  }}>View Profile</Button>
                    
        <Divider />
        </Box> :null}
         
         
        <MenuItem onClick={()=>{
              handleClickLogin()
          
        }}>
          <ListItemIcon>
            <LoginIcon fontSize="small" />
          </ListItemIcon>
          Login
        </MenuItem>
           { user?.user? <MenuItem  
            onClick={()=>{
              handleClickLogout()
        }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>:null}
      </Menu>
            </Box>
             
            {/* SEARCH BAR on mobile screens */}
            {ismobile ? (
                 
                    <Box
                        display="flex"
                        backgroundColor={colors.grey[300]}
                        borderRadius="3px"
                        flex={"1"}
            maxWidth={"700px"}
              overflow={"hidden"}
            maxHeight={isSearchBar ? "100px" : "0px"}
            sx={{
              transition:"max-height 0.7s ease-in-out"
            }}
                        
                    >
                         <SearchCoursesBar />
                    </Box>
                 
            ) : null}

            
        </Box>
    )
}

 

export default TobBar;