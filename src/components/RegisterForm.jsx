
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  useTheme
} from "@mui/material";
import { tokens } from "../theme";



const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


// Validation Schema
const UpdateProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  Email: Yup.string().email("Invalid email").required("Email is required"),
  Password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("Password"), null], "Passwords must match")
    .required("Confirm your password"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  profilePic: Yup.mixed().required("Profile image is required"),
});

// Dropzone Component
const DropzoneField = ({ field, form }) => {
  const onDrop = (acceptedFiles) => {
    form.setFieldValue(field.name, acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop,
  });

  const file = form.values[field.name];

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed gray",
        p: 2,
        textAlign: "center",
        borderRadius: "8px",
        cursor: "pointer",
        backgroundColor: isDragActive ? "lightblue" : "transparent",
        mt: 2,
      }}
    >
      <input {...getInputProps()} />
      {file ? (
        <Box>
          <Avatar
            src={URL.createObjectURL(file)}
            alt="Preview"
            sx={{ width: 80, height: 80, mx: "auto", mb: 1 }}
          />
          <Typography variant="body2">{file.name}</Typography>
        </Box>
      ) : (
        <Typography>Drag & drop a profile image, or click</Typography>
      )}
    </Box>
  );
};

// Main Form
const RegisterFrom = () => {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const handleFormSubmit = (values) => {
        console.log(values);
    }

    return (
        <Box maxWidth={"500px"} p="20px" bgcolor={colors.primary[200]} borderRadius={"10px"}>
                    <Formik 
            initialValues={{
                name: "",
                Email: "", 
                Password: "",
                confirmPassword: "",
                phone: "",
                profilePic: null,
            }}
            validationSchema={UpdateProfileSchema}
            onSubmit={ handleFormSubmit}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
            }) => (
                    <Form style={{textAlign:"center"}}  >
                        <Typography variant="h3">Register Now</Typography>
                {/* Name */}
                <TextField
                sx={{backgroundColor:colors.primary[100]}}
                    fullWidth
                    name="name"
                    label="Full Name"
                    margin="normal"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                />

                {/* Email */}
                <TextField
                sx={{backgroundColor:colors.primary[100]}}
                    fullWidth
                    name="Email"
                    label="Email"
                    margin="normal"
                    value={values.Email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.Email && !!errors.Email}
                    helperText={touched.Email && errors.Email}
                />
 

                {/* Password */}
                <TextField
                sx={{backgroundColor:colors.primary[100]}}
                    fullWidth
                    type="password"
                    name="Password"
                    label="Password"
                    margin="normal"
                    value={values.Password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.Password && !!errors.Password}
                    helperText={touched.Password && errors.Password}
                />

                {/* Confirm Password */}
                <TextField
                sx={{backgroundColor:colors.primary[100]}}
                    fullWidth
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    margin="normal"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.confirmPassword && !!errors.confirmPassword}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                />

                {/* Phone */}
                <TextField
                sx={{backgroundColor:colors.primary[100]}}
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    margin="normal"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
                />

                {/* Profile Image Upload */}
                <DropzoneField
                    field={{ name: "profilePic" }}
                    form={{ values, setFieldValue }}
                />
                {touched.profilePic && errors.profilePic && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {errors.profilePic}
                    </Typography>
                        )}
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            
                        {/* Submit */}
                        <Button type="submit" variant="contained" sx={{  backgroundColor: colors.purple[500], width: "fit-content", color: colors.white[100], margin: "20px 0" }}>Register</Button>
                        
                        </Box>

                </Form>
            )}
            </Formik>
      </Box>
    
  );
};

export default RegisterFrom;
