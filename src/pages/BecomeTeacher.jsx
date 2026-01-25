import { Button,useTheme, Alert, Box, } from "@mui/material";
import { tokens } from "../theme";
import { useConvertToTeacher } from "../hooks/useConvertToTeacher";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

 
const BecomeTeacher = () => {
  const { convertToTeacher, convertionLoding,isTeacher} = useConvertToTeacher();
  const { user } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
    
  
    
  return (
    <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center", }}>
      

{isTeacher ?
         <Box display={"flex"} flexDirection={"column"} gap={"15px"}>
           <Alert
          iconMapping={{
            success: <CheckCircleOutlineIcon fontSize="inherit" />,
          }}
        >
          you are now Teacher  
          </Alert> 
            <Button onClick={()=>{navigate(`/UserProfile/${user.user.userId}`)}} variant="contained" sx={{backgroundColor:colors.purple[500], width:"180px", color:colors.white[100]  }}>View Profile</Button>
          

         </Box>
        :
        (
        <>
          <h1>Become a Teacher</h1>
          <Button onClick={convertToTeacher} loading={convertionLoding} variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100]  }}>convert me to teacher</Button>

        </>
          
        )
                        
      }
          
    </div>
  );
};

export default BecomeTeacher;