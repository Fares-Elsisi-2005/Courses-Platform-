import {useTheme, Box,Button ,Typography,IconButton  ,Divider,Avatar,TextField ,TextareaAutosize  } from "@mui/material";
import { tokens } from "../theme";
/* import { useNavigate } from "react-router-dom"; */
import MoreVertIcon from '@mui/icons-material/MoreVert';
 import { styled, alpha } from '@mui/material/styles';
import { useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteIcon from '@mui/icons-material/Delete';


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
        ...theme.applyStyles('dark', {
          color: 'inherit',
        }),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

const Comment = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
 const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    return (
        <Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Box display={"flex"}   gap={"10px"} >
                    <Avatar alt="Ardit korko" src="/assets/testImages/pic-1.jpg"  /> 
                    <Box>
                        <Typography variant="h5">Ardit korko</Typography>
                        <Typography variant="h6" sx={{color:colors.primary[300],}}>8-9-2025</Typography>

                    </Box>
                </Box>
                <Box>
                    <IconButton
                     id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
                >
                    <MoreVertIcon />
                    </IconButton>
                    <StyledMenu
                            id="demo-customized-menu"
                            slotProps={{
                            list: {
                                'aria-labelledby': 'demo-customized-button',
                            },
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose} disableRipple>
                            <EditIcon />
                            Edit
                            </MenuItem>
                        
                            <MenuItem onClick={handleClose} disableRipple>
                                    <DeleteIcon />
                                    delete
                            </MenuItem>
            
                    </StyledMenu>
                </Box>


                </Box>
                <Box sx={{
                    minHeight: "60px", p: "10px", m: "13px 0", borderRadius: "6px", backgroundColor: colors.primary[100],
                    position: "relative",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        borderStyle: "solid",
                        borderWidth: "15px",
                        borderColor: ` transparent  transparent ${colors.primary[100]}`,
                        top: "-24px",
                        left:"5px"
                       
                    }
                 }}>
                    <Typography variant="body1">
                        Awesome tutorial!
                        keep going
                    </Typography>

                </Box>
            </Box>
            
    )
}



const Comments = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    /* const navigate = useNavigate(); */

   

    return (
        <Box
        sx={{
            backgroundColor: colors.primary[200],
                p: "15px",
                display: "flex",
                flexDirection: "column",
            gap:"15px"
            }} >
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            
            
             
        </Box>
    )
}



export default Comments;