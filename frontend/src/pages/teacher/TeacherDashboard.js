import { useState } from "react";
import {
  CssBaseline,
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TeacherSideBar from "./TeacherSideBar";
import { Navigate, Route, Routes } from "react-router-dom";
import Logout from "../Logout";
import AccountMenu from "../../components/AccountMenu";
import { AppBar, Drawer } from "../../components/styles";
import StudentAttendance from "../admin/studentRelated/StudentAttendance";

import TeacherClassDetails from "./TeacherClassDetails";
import TeacherComplain from "./TeacherComplain";
import TeacherHomePage from "./TeacherHomePage";
import TeacherProfile from "./TeacherProfile";
import TeacherViewStudent from "./TeacherViewStudent";
import StudentExamMarks from "../admin/studentRelated/StudentExamMarks";

const TeacherDashboard = () => {
  // State to manage the drawer's open/close state
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    // Main container for the teacher dashboard
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          open={open}
          position="absolute"
          sx={{ backgroundColor: "darkblue" }}
        >
          {/* Toolbar for the app bar */}
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            {/* Title of the dashboard */}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Teacher Dashboard
            </Typography>
            {/* Account menu component */}
            <AccountMenu />
          </Toolbar>
        </AppBar>
        <Drawer
          // Drawer component for the sidebar
          variant="permanent"
          open={open}
          sx={open ? styles.drawerStyled : styles.hideDrawer}
        >
          <Toolbar sx={styles.toolBarStyled}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          {/* Sidebar component */}
          <List component="nav">
            <TeacherSideBar />
          </List>
        </Drawer>
        {/* Main content area */}
        <Box component="main" sx={styles.boxStyled}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<TeacherHomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
            <Route path="/Teacher/profile" element={<TeacherProfile />} />

            <Route path="/Teacher/complain" element={<TeacherComplain />} />

            <Route path="/Teacher/class" element={<TeacherClassDetails />} />
            <Route
              path="/Teacher/class/student/:id"
              element={<TeacherViewStudent />}
            />

            <Route
              path="/Teacher/class/student/attendance/:studentID/:subjectID"
              element={<StudentAttendance situation="Subject" />}
            />
            <Route
              path="/Teacher/class/student/marks/:studentID/:subjectID"
              element={<StudentExamMarks situation="Subject" />}
            />

            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default TeacherDashboard;

const styles = {
  // Styles for the main content area
  boxStyled: {
    backgroundColor: (theme) =>
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  // Styles for the toolbar
  toolBarStyled: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    px: [1],
  },
  // Styles for the drawer when it's open
  drawerStyled: {
    display: "flex",
  },
  // Styles for the drawer when it's hidden
  hideDrawer: {
    display: "flex",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
};
