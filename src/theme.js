import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
 

//color design tokens

export const tokens = (mode) => ({
    ...(mode === "dark" ? {
        primary: {
            100:"#303330",
            200: "#202320",
            300: "#fff",
            400:"#141313e0",
            
        },
        white: {
            100:"#fff"
        },
        dark: {
            100: "#202320",
            200: "#313531ff",
            300: "#4b504bff",
        },
        purple: {
            500:"rgb(172 89 178)",
            600:"rgb(156 61 163)",
        },
        grey: {
            300: "#7a7373ff",
            400: "#8e9595ff",
        },
        yellow: {
            100:"#e4c600ff",
            200:"#c6af1dff",
        },
        blue: {
            100:"#2177e8"
        }
    }
        :
        {
         primary: {
            100:"#d3d5d5",
            200: "#fff",
            300: "#3a3939ff",
            400:"#ede5e5c6",
            
            
            },
        
        white: {
            100:"#fff"
            },
        dark: {
            100: "#202320",
            200: "#313531ff",
            300: "#4b504bff",
        },
         purple: {
             500: "rgb(172 89 178)",
            600:"rgb(156 61 163)",
             
        },
            grey: {
                300: "#cbc7c7ff",
            400: "#8e9595ff",
        },
        yellow: {
           100:"#e4c600ff",
            200:"#c6af1dff",
            },
        blue: {
            100:"#2177e8"
        }
    })
})


// mui theme settings

export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === "dark")
                ? {
                    primary: {
                    main: colors.primary[200],
                    },
                    background: {
                        default:colors.primary[200]
                    }
            }:{
                    primary: {
                    main: colors.primary[200],
                    },
                    background: {
                        default:colors.primary[200]
                    }
            }
        },
        typography: {
            fontFamily: ["Source Sans Pro", "Sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "Sans-serif"].join(","),
                fontSize:40,
            },
            h2: {
                fontFamily: ["Source Sans Pro", "Sans-serif"].join(","),
                fontSize:32,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "Sans-serif"].join(","),
                fontSize:24,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "Sans-serif"].join(","),
                fontSize:20,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "Sans-serif"].join(","),
                fontSize:16,
            },
            h6: {
                fontFamily: ["Source Sans Pro", "Sans-serif"].join(","),
                fontSize:14,
            },
             
        }
    }
}


// constext for color mode

export const ColorModeContext = createContext({
    toggleColorMode: () => {
        
    }
})

export const useMode = () => {
    const [mode, setMode] = useState(() => {
        // Load theme from localStorage or default to "light"
        const savedTheme = localStorage.getItem("themeMode");
        return savedTheme || "light";
    });

    const colorMode = useMemo(() => ({
          toggleColorMode: () => {
            setMode((prev) => {
                const newMode = prev === "dark" ? "light" : "dark";
                localStorage.setItem("themeMode", newMode);
                return newMode;
            });
    }
    }), [])

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


    return [theme, colorMode]
}
