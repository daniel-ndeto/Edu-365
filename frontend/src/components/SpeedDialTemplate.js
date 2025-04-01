import React from "react";
import { SpeedDial, SpeedDialAction, styled } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

// SpeedDialTemplate component for rendering a speed dial with actions
const SpeedDialTemplate = ({ actions }) => {
  return (
    // CustomSpeedDial component with specified properties
    <CustomSpeedDial
      ariaLabel="SpeedDial playground example" // Aria label for accessibility
      icon={<TuneIcon />} // Icon to display on the speed dial button
      direction="left" // Direction in which actions will appear
    >
      {/* Map through the actions array and render a SpeedDialAction for each */}
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name} // Unique key for each action
          icon={action.icon} // Icon for the action
          tooltipTitle={action.name} // Tooltip text for the action
          onClick={action.action} // Function to call when the action is clicked
        />
      ))}
    </CustomSpeedDial>
  );
};

export default SpeedDialTemplate;

// Styled component for customizing the SpeedDial
const CustomSpeedDial = styled(SpeedDial)`
  // Style for the floating action button (fab) within the SpeedDial
  .MuiSpeedDial-fab {
    background-color: #032803; // Default background color

    // Hover effect for the fab
    &:hover {
      background-color: green; // Background color on hover
    }
  }
`;
