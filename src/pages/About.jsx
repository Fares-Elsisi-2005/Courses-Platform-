import {useTheme, Box,Button ,Typography    } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import aboutImg from "../assets/testImages/about-img.svg";
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';



const About = () => {
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     const navigate = useNavigate();
     return ( 
          <Box>
               <Box mb={"20px"} display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{
                    flexDirection: {
                         lg:"row",
                         md: "row",
                         sm:"row",
                    xs:"column"
               }
          }}>
               <Box flexBasis={"50%"}>
                    <img src={aboutImg} alt="About us" width="100%" />

               </Box>
               <Box flexBasis={"50%"}>
                    <Typography variant="h4" sx={{marginBottom:"10px"}}>Skills are the key to unlocking potential</Typography>
                    <Typography variant="body1">Whether you want to learn a new skill, train your teams, or share what you know with the world, you’re in the right place. As a leader in online learning, we’re here to help you achieve your goals and transform your life.</Typography>
                    <Button onClick={()=>{navigate("/Courses")}} variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100], margin:"20px 0"  }}>Our Courses</Button>
               </Box>
          </Box>
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
                         borderRadius: "6px",
                         padding: "20px",
                         display: "flex",
                         gap: "15px",
                         minHeight:"100px"

                         
                         
                    }}>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                              <SchoolIcon   sx={{color:colors.purple[500],fontSize:"40px"}}/>
                    </Box>
                    <Box >
                         <Typography variant="h3">+10K</Typography>
                         <Typography sx={{color:colors.grey[400],mt:"5px"}}>Online courses</Typography>
                              
                    </Box>

                         
                         
                    </Box>
               
               
                    <Box sx={{
                         backgroundColor: colors.primary[200],
                         borderRadius: "6px",
                         padding: "20px",
                         display: "flex",
                         gap: "15px",
                         minHeight:"100px"

                         
                         
                    }}>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                              <ClassIcon   sx={{color:colors.purple[500],fontSize:"40px"}}/>
                    </Box>
                    <Box >
                         <Typography variant="h3">+10K</Typography>
                         <Typography sx={{color:colors.grey[400],mt:"5px"}}>brilliant students</Typography>
                              
                    </Box>

                         
                         
                    </Box>
               
               
                    <Box sx={{
                         backgroundColor: colors.primary[200],
                         borderRadius: "6px",
                         padding: "20px",
                         display: "flex",
                         gap: "15px",
                         minHeight:"100px"

                         
                         
                    }}>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                              <CastForEducationIcon   sx={{color:colors.purple[500],fontSize:"40px"}}/>
                    </Box>
                    <Box >
                         <Typography variant="h3">+10K</Typography>
                         <Typography sx={{color:colors.grey[400],mt:"5px"}}>expert tutors</Typography>
                              
                    </Box>

                         
                         
                    </Box>
               
               
                    <Box sx={{
                         backgroundColor: colors.primary[200],
                         borderRadius: "6px",
                         padding: "20px",
                         display: "flex",
                         gap: "15px",
                         minHeight:"100px"

                         
                         
                    }}>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                              <BusinessCenterIcon   sx={{color:colors.purple[500],fontSize:"40px"}}/>
                    </Box>
                    <Box >
                         <Typography variant="h3">+10K</Typography>
                         <Typography sx={{color:colors.grey[400],mt:"5px"}}>job placement</Typography>
                              
                    </Box>

                         
                         
                    </Box>
               
                    
                    </Box>
         </Box>

     )
}
 

export default About;
