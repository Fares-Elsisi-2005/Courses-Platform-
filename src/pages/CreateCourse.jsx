import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  TextField,
  Typography,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Avatar,
  useTheme,

} from "@mui/material";
import { tokens } from "../theme";

import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../Contexts/AppContext";


import BasicInfoStep from "../components/courseBasicInfoForm";
import CurriculumStep from "../components/courseCurriculumForm";

 
// Validation schemas for each step
const validationSchemas = [
  Yup.object({
    image: Yup.mixed().nullable(),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description required"),
    subCategoryId: Yup.string() ,
  }),

  
  Yup.object({
    playlist: Yup.array(),
  }),
];

 
// ---------------------- MAIN COMPONENT (ALL IN ONE) ----------------------

export default function CreateCourse() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { state ,dispatch} = useAppData();
  const { currentUser } = state;
  
 
       
  const [step, setStep] = useState(0);
  const steps = ["Basic Info", "Curriculum"];

  const isLastStep = step === steps.length - 1;

  const handleSubmit = async (values, helpers) => {
    console.log("submit now")
    if (isLastStep) {
     
       dispatch({type:"AddNewCourse",payload:{course:values,courseId:values.courseId}})

    } else {
      setStep(step + 1);
      helpers.setTouched({});

    }
  };

  return (
    <Box width="100%">
        <Box>
              <Button onClick={()=>{navigate(`/UserProfile/${currentUser.userId}`)}} sx={{ color: colors.grey[400] }}>Coures</Button>
                <span style={{ color: colors.dark[300] }}>&gt;</span>
              <Button onClick={()=>{navigate(`/TeachersCrateCourse/${currentUser.userId}`)}} sx={{ color: colors.blue[100] }}>Add new course</Button> 
        </Box>
        <Divider sx={{ margin: "15px 0px" }} />
      <Formik
        initialValues={{

          courseId: "c_2009",
    title: "",
    description: "",
    mainCategoryId:"",
    subCategoryId:  [],  
    teacherId: currentUser?.userId,
    image: null,
    rating: 4.7,
    studentsCount: 95,
    reviews: [],
          
          
          playlist: [ ],
        }}
        validationSchema={validationSchemas[step]}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Stepper */}
            <Stepper activeStep={step}   alternativeLabel
              sx={{
    mb: 4,
     
    "& .MuiStepIcon-root": {
      width: "32px",
      height: "32px",
      color: "#e0e0e0",
    },
     
    "& .MuiStepIcon-root.Mui-completed": {
      color:  `${colors.purple[600]}`,
    },
    "& .MuiStepLabel-label": {
      mt: 1,
      fontSize: "0.9rem",
      fontWeight: 600, 
    },
    
  }}
            >
              {steps.map((label, i) => (
                <Step key={i}  >
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Step Content */}
            <Box sx={{flexDirection:"column", display:"flex",justifyContent:"center",alignItems:"center" }}>
              {step === 0 && <BasicInfoStep  />}
              {step === 1 && <CurriculumStep />}

              
            {/* Navigation Buttons */}
            <Box display="flex" mt={4}>
              {step > 0 && (
                <Button
                  onClick={() => setStep(step - 1)}
                    sx={{
                      mr: 2,
                    backgroundColor:colors.grey[400]
                   }}
                  variant="outlined"
                >
                  Back
                </Button>
              )}

              <Button sx={{backgroundColor:colors.purple[500]}} type="submit" variant="contained">
                {isLastStep ? "Publish Course" : "Next"}
              </Button>
            </Box>

            </Box>
           
          </Form>
        )}
      </Formik>
    </Box>
  );
}

 