import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode,tokens } from "./theme";
import { CssBaseline,GlobalStyles , ThemeProvider,Box } from "@mui/material";
import { useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import TobBar from "./globalComponents/TobBar";
import SideBar from "./globalComponents/SideBar";
import Footer from "./globalComponents/Footer";
/* pages */
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import SavedPlaylits from  "./pages/SavedPlaylists";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Teachers from "./pages/Teachers";
import CreateCourse from "./pages/createCourse";

import UserProfilePage from "./pages/UserProfilePage"
import UserProfileUpdate from "./pages/UserProfileUpdate";
import Video from "./pages/Video";
import LikedVideos from "./pages/LikedVideos"
import NotFound from "./pages/NotFound";

// context 
import { AppProvider } from "./Contexts/AppContext";
import { AuthProvider } from "./Contexts/AuthContext";

// component for role based
import ProtectedRoute from "./components/ProtectedRoute"





function App() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const colors = tokens(theme.palette.mode);
  

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
           <AppProvider>
          <div className="app"style={{
          display: 'flex',
          minHeight: '100vh', 
          position:"relative"
        }}>
           <GlobalStyles
        styles={{
          body: {
            backgroundColor: colors.primary[100],
            minHeight: "100vh",
            margin: 0,
          },
        }}
      />
          <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          {isSmallScreen?<div className="darkCover" style={{
            position: "fixed",
            top: "0px",
            left: "0px",
            height: "100%",
            width: "100%",
            backgroundColor: "#000000a8", 
            display: !isCollapsed ? "block" : "none",
            zIndex:"15"
          }}></div>:<></>}
          <main className="content" style={{position:"relative",display:"flex",flexDirection:"column",justifyContent:"space-between"}}  >
            <TobBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <Box padding={"20px"} flex={"1"} >
              <Routes>
                <Route path="/" element={ <Home/>} /> 
                <Route path="/About" element={ <About/>} /> 
                <Route path="/ContactUs" element={ <ContactUs/>} /> 
                
                <Route path="/courses/:categoryParam?/:subCategoryParam?" element={<Courses />} />
 
                <Route path="/Course/:id" element={<Course />} /> 
                <Route path="/SavedPlaylits" element={<SavedPlaylits />} /> 
                <Route path="/Video/:courseid/:videoid" element={<Video />} /> 
                <Route path="/LikedVideos" element={<LikedVideos />} /> 
                <Route path="/Teachers" element={<Teachers />} /> 
                <Route
                  path="/UserProfile/:id"
                  element={
                    <UserProfilePage />
                  }
                />
                <Route
                  path="/TeachersCrateCourse/:id"
                  element={
                    <CreateCourse/>
                  }
                />
                <Route path="/UserProfileUpdate" element={<UserProfileUpdate />} /> 
                
                <Route path="/Login" element={ <Login/>} /> 
                <Route path="/SignUp" element={ <SignUp/>} /> 
                <Route path="*" element={ <NotFound/>} /> 
  
              </Routes>
             
            </Box>
             <Footer/>
             
          </main>
        </div>
        </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

/* 
home => all
about=> all
contactus=> all
courses => all
course => all
video => student, teachers , enrolled, admin
liked videos => student, teachers, admin
saved courses => student ,teachers,admin
login => all
sign up => all
teacherProfile=>teacher, student ,admin
updateteacherProfile=> teacher, admin
studentProfile =>student, teacher, admin
updateUserProfile => student, admin
teachers => all
notfound =>all

 */