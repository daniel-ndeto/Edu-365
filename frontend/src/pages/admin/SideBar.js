import * as React from "react";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tooltip,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import ReportIcon from "@mui/icons-material/Report";
import AssignmentIcon from "@mui/icons-material/Assignment";

const SideBar = () => {
  // Get the current location from react-router-dom
  const location = useLocation();
  return (
    <>
      <React.Fragment>
        {/* Home button */}
        <ListItemButton component={Link} to="/">
          <Tooltip title={"Home"}> {/* Tooltip for the Home button */}
            <ListItemIcon>
              <HomeIcon
                color={
                  location.pathname === ("/" || "/Admin/dashboard")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
          </Tooltip> {/* Display the tooltip */}
          <ListItemText primary="Home" /> {/* Text for the Home button */}
        {/* Classes button */}
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/classes">
          <Tooltip title={"Classes"}>
            <ListItemIcon>
              <ClassOutlinedIcon
                color={
                  location.pathname.startsWith("/Admin/classes")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
          </Tooltip> {/* Display the tooltip */}
          <ListItemText primary="Classes" /> {/* Text for the Classes button */}
        {/* Subjects button */}
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/subjects">
          <Tooltip title={"Subjects"}>
            <ListItemIcon>
              <AssignmentIcon
                color={
                  location.pathname.startsWith("/Admin/subjects")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
          </Tooltip> {/* Display the tooltip */}
          <ListItemText primary="Subjects" /> {/* Text for the Subjects button */}
        {/* Teachers button */}
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/teachers">
          <Tooltip title={"Teachers"}>
            <ListItemIcon>
              <SupervisorAccountOutlinedIcon
                color={
                  location.pathname.startsWith("/Admin/teachers")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
          </Tooltip> {/* Display the tooltip */}
          <ListItemText primary="Teachers" /> {/* Text for the Teachers button */}
        {/* Students button */}
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/students">
          <Tooltip title={"Students"}>
            <ListItemIcon>
              <PersonOutlineIcon
                color={
                  location.pathname.startsWith("/Admin/students")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
          </Tooltip> {/* Display the tooltip */}
          <ListItemText primary="Students" /> {/* Text for the Students button */}
        {/* Notices button */}
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/notices">
          <Tooltip title={"Notice"}>
            <ListItemIcon>
              <AnnouncementOutlinedIcon
                color={
                  location.pathname.startsWith("/Admin/notices")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
          </Tooltip> {/* Display the tooltip */}
          <ListItemText primary="Notices" /> {/* Text for the Notices button */}
        {/* Complains button */}
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/complains">
          <Tooltip title={"Complains"}>
            <ListItemIcon>
              <ReportIcon
                color={
                  location.pathname.startsWith("/Admin/complains")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
          </Tooltip> {/* Display the tooltip */}
          <ListItemText primary="Complains" /> {/* Text for the Complains button */}
        </ListItemButton>
      </React.Fragment>
      <Divider sx={{ my: 1 }} />
      <React.Fragment>
        {/* User section */}
        <ListSubheader component="div" inset>
          User {/* User section header */}
        </ListSubheader>
        <ListItemButton component={Link} to="/Admin/profile">
          <Tooltip title={"Profile"}>
            <ListItemIcon>
              <AccountCircleOutlinedIcon
                color={
                  location.pathname.startsWith("/Admin/profile")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
          </Tooltip> {/* Display the tooltip */}
          <ListItemText primary="Profile" /> {/* Text for the Profile button */}
        {/* Logout button */}
        </ListItemButton>
        <ListItemButton component={Link} to="/logout">
          <Tooltip title={"Logout"}>
            <ListItemIcon>
              <ExitToAppIcon
                color={
                  location.pathname.startsWith("/logout")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
          </Tooltip> {/* Display the tooltip */}
          <ListItemText primary="Logout" /> {/* Text for the Logout button */}
        </ListItemButton>
      </React.Fragment>
    </>
  );
};

export default SideBar;
