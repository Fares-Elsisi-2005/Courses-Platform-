import {useTheme, Box ,Typography    } from "@mui/material";
import { tokens } from "../theme";

const Footer = () => {
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     return (
          <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  sx={{
    backgroundColor: colors.primary[200],
    padding: "25px",
    position: "sticky",
    bottom: "-1px"
  }}
>
  &copy; copyright @ 2025 by
  <a
    href="https://faresahmedelsisi.netlify.app/"
    target="_blank"
    rel="noreferrer"
    style={{
      color: colors.purple[500],
      margin: "5px",
      cursor: "pointer",
      textDecoration: "none"
    }}
  >
    Fares Ahmed
  </a>
  | all rights reserved!
</Box>
     )
}
 

export default Footer;