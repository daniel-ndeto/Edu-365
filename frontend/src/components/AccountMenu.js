// Import necessary modules and components from Material-UI and React
import React, { useState } from "react";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";

// Import icons from Material-UI
// eslint-disable-next-line no-unused-vars
import { Settings, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Define the AccountMenu component
const AccountMenu = () => {
  // State to manage the anchor element for the menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Determine if the menu is open
  const open = Boolean(anchorEl);

  // Access current user and role from the Redux store
  const { currentRole, currentUser } = useSelector((state) => state.user);

  // Handle click event to open the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // Handle close event to close the menu
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          {/* IconButton to trigger the menu */}
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {/* Avatar component to display user's initial */}
            <Avatar sx={{ width: 32, height: 32 }}>
              {String(currentUser.name).charAt(0)}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        // Menu component to display options
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: styles.styledPaper,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* MenuItem for profile navigation */}
        <MenuItem>
          <Avatar />
          <Link to={`/${currentRole}/profile`}>Profile</Link>
        </MenuItem>
        <Divider />
        {/* MenuItem for logout navigation */}
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Link to="/logout">Logout</Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;

// Styles for the menu paper
const styles = {
  styledPaper: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};
