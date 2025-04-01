import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import ActionMenu from "./ActionMenu"; // Ensure this component is available

// Functional component that conditionally renders based on viewport size
const ResponsiveActionComponent = ({ row, actions }) => {
  // State to track if the device is mobile based on viewport width
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the viewport is mobile (max-width: 768px)
    const handleResize = () => {
      const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(isMobileDevice);
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);
    // Initialize the value on the first render
    handleResize();

    // Cleanup: remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        // Render ActionMenu for mobile devices
        <ActionMenu row={row} actions={actions} />
      ) : (
        // Render StyledSpeedDial for larger screens
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          icon={<SpeedDialIcon />}
          direction="right"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.action}
            />
          ))}
        </StyledSpeedDial>
      )}
    </>
  );
};

// Styled component to customize the appearance of SpeedDial
const StyledSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background-color: #240439;
    &:hover {
      background-color: #440080;
    }
  }
`;

export default ResponsiveActionComponent;
