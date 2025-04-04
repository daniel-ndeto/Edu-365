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
import StudentSideBar from "./StudentSideBar";
import { Navigate, Route, Routes } from "react-router-dom";
import StudentHomePage from "./StudentHomePage";
import StudentProfile from "./StudentProfile";
import StudentForm from "./StudentForm";
import StudentSubjects from "./StudentSubjects";
import ViewStdAttendance from "./ViewStdAttendance";
import StudentComplain from "./StudentComplain";
import Logout from "../Logout";
import AccountMenu from "../../components/AccountMenu";
import { AppBar, Drawer } from "../../components/styles";

const StudentDashboard = () => {
  // State to manage the drawer's open/close state
  const [open, setOpen] = useState(false);
  // Function to toggle the drawer's open/close state
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    // Main container for the student dashboard
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
              Student Dashboard
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
          <List component="nav">
            {/* Sidebar component */}
            <StudentSideBar />
          </List>
        </Drawer>
        <Box component="main" sx={styles.boxStyled}>
          {/* Main content area */}
          <Toolbar />
          <Routes>
            <Route path="/" element={<StudentHomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/Student/dashboard" element={<StudentHomePage />} />
            <Route path="/Student/profile" element={<StudentProfile />} />
            <Route path="/Student/form" element={<StudentForm />} />

            <Route path="/Student/subjects" element={<StudentSubjects />} />
            <Route path="/Student/attendance" element={<ViewStdAttendance />} />
            <Route path="/Student/complain" element={<StudentComplain />} />

            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default StudentDashboard;

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
