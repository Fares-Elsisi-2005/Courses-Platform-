 import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../Contexts/AuthContext";
import { useWriteCourse } from "../hooks/useWriteCourse";
import { useGetTeacherCourses } from "../hooks/useGetCoursesById";
import { useCloudinaryUpload } from "../hooks/usecloudinaryUpload";

import BasicInfoStep from "../components/courseBasicInfoForm";
import CurriculumStep from "../components/courseCurriculumForm";

import { toast } from 'react-toastify';

// --------------------------------------------------
// Validation schemas
// --------------------------------------------------
const validationSchemas = [
  Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    subCategoryId: Yup.string().required("Sub category required"),
  }),
  Yup.object({
    playlist: Yup.array(),
  }),
];

// --------------------------------------------------
// Safe EMPTY defaults (never undefined)
// --------------------------------------------------
const EMPTY_INITIAL_VALUES = {
  title: "",
  description: "",
  mainCategoryId: "",
  subCategoryId: "",
  teacherId: "",
  image: null,
  rating: 4.7,
  studentsCount: 0,
  reviews: [],
  playlist: [],
};

export default function CreateCourse() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { user } = useAuth();
  const { addCourse, editCourse,writeCourseLoading } = useWriteCourse();
  const { uploadFile, uploadLoading,uploadError } = useCloudinaryUpload();
  
  const isEdit = Boolean(courseId);

  // --------------------------------------------------
  // 🔥 CRITICAL FIX — memoized array
  // --------------------------------------------------
  const courseIds = useMemo(
    () => (isEdit ? [courseId] : []),
    [isEdit, courseId]
  );

  const { courses, loading } = useGetTeacherCourses(courseIds);

  // --------------------------------------------------
  // Stepper state
  // --------------------------------------------------
  const [step, setStep] = useState(0);
  const steps = ["Basic Info", "Curriculum"];
  const isLastStep = step === steps.length - 1;

  // --------------------------------------------------
  // Build initial values safely
  // --------------------------------------------------
  const initialValues = useMemo(() => {
    if (isEdit && courses.length > 0) {
      return {
        ...EMPTY_INITIAL_VALUES,
        ...courses[0],
        subCategoryId: courses[0].subCategoryId ?? "",
        teacherId: courses[0].teacherId ?? user?.user?.userId ?? "",
      };
    }

    return {
      ...EMPTY_INITIAL_VALUES,
      teacherId: user?.user?.userId ?? "",
    };
  }, [isEdit, courses, user]);

  // --------------------------------------------------
  // Submit handler
  // --------------------------------------------------
 const handleSubmit = async (values, helpers) => {
  if (!isLastStep) {
    setStep((prev) => prev + 1);
    helpers.setTouched({});
    return;
  }

  try {
    // -----------------------------
    // 1️⃣ Upload main course image
    // -----------------------------
    let courseImageUrl = values.image;

    if (values.image instanceof File) {
      courseImageUrl = await uploadFile(values.image, "image");
    }

    // -----------------------------
    // 2️⃣ Upload all video thumbnails
    // -----------------------------
    const playlistWithUrls = await Promise.all(
      values.playlist.map(async (video) => {
        // Only upload if it's a File, not already a URL
        console.log("uploading image : ",video.thumbImage)
        const thumbUrl =
          video.thumbImage instanceof File
            ? await uploadFile(video.thumbImage, "image")
            : video.thumbImage;

        return { ...video, thumbImage: thumbUrl };
      })
    );
    console.log("playlistWithUrls : ",playlistWithUrls)

    // -----------------------------
    // 3️⃣ Prepare final course object
    // -----------------------------
    const finalCourse = {
      ...values,
      image: courseImageUrl,
      playlist: playlistWithUrls,
    };

    // -----------------------------
    // 4️⃣ Save to Firebase
    // -----------------------------
    if (isEdit) {
      await editCourse(finalCourse);
      toast.success("Course updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
    } else {
      await addCourse(finalCourse);
      toast.success("Course added successfully!", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
    }

    // -----------------------------
    // 5️⃣ Navigate back
    // -----------------------------
    navigate(`/UserProfile/${user.user.userId}`);
  } catch (err) {
    console.error(err);
    toast.error("Failed to save course. See console for details.", {
      position: "top-right",
      autoClose: 5000,
      theme: "colored",
    });
  }
};
  // --------------------------------------------------
  // Loading guard (edit mode only)
  // --------------------------------------------------
  if (isEdit && loading) {
    return <Typography>Loading course...</Typography>;
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  return (
    <Box width="100%">
      {/* Breadcrumb */}
      <Box>
        <Button
          onClick={() => navigate(`/UserProfile/${user.user.userId}`)}
          sx={{ color: colors.grey[400] }}
        >
          Courses
        </Button>
        <span style={{ color: colors.dark[300] }}>&gt;</span>
        <Button sx={{ color: colors.blue[100] }}>
          {isEdit ? "Edit Course" : "Add New Course"}
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchemas[step]}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            {/* Stepper */}
            <Stepper
              activeStep={step}
              alternativeLabel
              sx={{
                mb: 4,
                "& .MuiStepIcon-root": {
                  width: 32,
                  height: 32,
                  color: "#e0e0e0",
                },
                "& .MuiStepIcon-root.Mui-completed": {
                  color: colors.purple[600],
                },
                "& .MuiStepLabel-label": {
                  mt: 1,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                },
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Step content */}
            <Box display="flex" flexDirection="column" alignItems="center">
              {step === 0 && <BasicInfoStep />}
              {step === 1 && <CurriculumStep />}

              {/* Buttons */}
              <Box display="flex" mt={4}>
                {step > 0 && (
                  <Button
                    onClick={() => setStep((prev) => prev - 1)}
                    variant="outlined"
                    sx={{ mr: 2 }}
                  >
                    Back
                  </Button>
                )}

                 
                  <Button
                  type="submit"
                    variant="contained"
                    loading={writeCourseLoading ||uploadLoading}
                  sx={{ backgroundColor: colors.purple[500] }}
                >
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