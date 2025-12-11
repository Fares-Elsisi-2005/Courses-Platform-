import { Button,useTheme, } from "@mui/material";
import { tokens } from "../theme";
import { useConvertToTeacher } from "../hooks/useConvertToTeacher";

const BecomeTeacher = () => {
  const { convertToTeacher} = useConvertToTeacher();
     
       const theme = useTheme();
       const colors = tokens(theme.palette.mode);
  return (
    <div>
      <h1>Become a Teacher</h1>
      <p>This is the Become a Teacher page.</p>
      <Button onClick={convertToTeacher} variant="contained" sx={{backgroundColor:colors.purple[500], width:"fit-content", color:colors.white[100]  }}>convert me to teacher</Button>

    </div>
  );
};

export default BecomeTeacher;