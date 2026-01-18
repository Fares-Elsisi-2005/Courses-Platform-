import { Box, Button, TextField, useMediaQuery,useTheme,TextareaAutosize} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "../theme";

import { toast } from 'react-toastify';
 
import { useState } from "react";

const initialValues = {
    Name: "",
    email: "",
    contact: "", 
};


const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


const userSchema = yup.object().shape({
    Name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"), 
    Message: yup.string()
    .min(10, "Message should be at least 10 characters")
    .required("Message is required"),
     

});


const ContactForm = () => {

    const [loading, setLoading] = useState(false);
    const isMobile = useMediaQuery("(max-width:700px)");
   /*  const handleFormSubmit = (values) => {
        console.log(values);
    }
 */

    const handleFormSubmit = async (values, { resetForm }) => {
  const templateId = "template_qu2vkw7";     // from EmailJS dashboard
  const serviceId = "service_tp3amgs";       // from EmailJS dashboard
  const publicKey = import.meta.env.VITE_PUBLIC_KEY; // from EmailJS dashboard

  const data = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey, // this is your Public Key
    template_params: {
      from_name: values.Name,
      from_email: values.email,
      contact: values.contact,
      message: values.Message,
    },
  };

        try {
            setLoading(true);
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const responseData = await res.text();
            console.log("SUCCESS!", responseData);
        setLoading(false);

    toast.success("Message sent successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    resetForm();
  } catch (err) {
    console.error("FAILED...", err);

    toast.error("Something went wrong. Please try again.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    return (
        <Box sx={{width:isMobile?"100%":"50%"}} p="20px" bgcolor={colors.primary[200]} borderRadius={"10px"}>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={userSchema}
            >

                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => ( 
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0,1fr))"
                            

                        >
                            
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Name}
                                name="Name"
                                error={!!touched.Name && !!errors.Name}
                                helperText={touched.Name && errors.Name}
                                sx={{gridColumn:"span 4",}}
                            />
 
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{gridColumn:"span 4"}}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Contact Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.contact}
                                name="contact"
                                error={!!touched.contact && !!errors.contact}
                                helperText={touched.contact && errors.contact}
                                sx={{gridColumn:"span 4"}}
                            />
                            <TextField
                                fullWidth
                                type="text"
                            variant="filled"
                            label="Message"
                            name="Message"
                            multiline
                            rows={6}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.Message}
                            error={!!touched.Message && !!errors.Message}
                            helperText={touched.Message && errors.Message}
                            sx={{ gridColumn: "span 4" }}
                            />

 

                        </Box>

                        <Box display="flex"  justifyContent="end" mt="20px">

                            <Button type="submit"loading={loading} color="secondary" variant="contained">
                                Send Message
                            </Button>
                            
                        </Box>
                    </form>
                )}

            </Formik>
        
        </Box>
    )
}

export default ContactForm;