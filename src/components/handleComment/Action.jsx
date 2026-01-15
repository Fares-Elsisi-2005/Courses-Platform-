import React from "react";
import { useTheme, } from "@mui/material";
import { tokens } from "../../theme";

 
const Action = ({ handleClick, type, className }) => {
  const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <div style={{

      fontSize: "10px",
      padding: "5px",
      borderRadius: "5px",
      color: colors.primary[300],
      fontWeight: "600",
      cursor: "pointer",
    }}   onClick={handleClick}>
      {type}
    </div>
  );
};

export default Action;
