
import ContactForm from "../components/ContactForm";
import { Box,useMediaQuery } from "@mui/material";
const ContactUs = () => {
     const isMobile = useMediaQuery("(max-width:700px)");
     return (
          <Box display={"flex"} flexDirection={isMobile?"column":"row"}   justifyContent={"center"} alignItems={"center"}>
               <Box sx={{
                    width: isMobile ? "100%" : "50%" 
               }}>
               <img   width={"100%"} src="/assets/testImages/contact-img.svg" alt="" />

               </Box>
               <ContactForm  />
          </Box>
     )
}
 

export default ContactUs;