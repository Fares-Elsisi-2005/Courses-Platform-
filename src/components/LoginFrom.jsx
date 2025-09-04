
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  useTheme
} from "@mui/material";
import { tokens } from "../theme";

 

// Validation Schema
const UpdateProfileSchema = Yup.object().shape({
  Email: Yup.string().email("Invalid email").required("Email is required"),
  Password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("password is required"),
});

 
// Main Form
const LoginFrom = () => {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const handleFormSubmit = (values) => {
        console.log(values);
    }

    return (
        <Box maxWidth={"500px"} p="20px" bgcolor={colors.primary[200]} borderRadius={"10px"}>
                    <Formik 
            initialValues={{ 
                Email: "", 
                Password: "",
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
                 
            }) => (
                    <Form style={{textAlign:"center"}}  >
                        <Typography variant="h3">Login Now</Typography>
                

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

                
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    
                {/* Submit */}
                <Button type="submit" variant="contained" sx={{  backgroundColor: colors.purple[500], width: "fit-content", color: colors.white[100], margin: "20px 0" }}>Login</Button>
                
                </Box>

                </Form>
            )}
            </Formik>
      </Box>
    
  );
};

export default LoginFrom;
