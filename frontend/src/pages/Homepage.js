/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Box, Button } from "@mui/material";
import styled from "styled-components";
import Students from "../assets/homepage.png";
import { DarkBlueButton } from "../components/buttonStyles";
import { keyframes } from "styled-components";

// Keyframes for the text animation
const textclip = keyframes`
  to {
    background-position: 200% center;
  }
`;

// Styled component for the animated title
const AnimatedTitle = styled.h1`
  font-size: 3rem;
  color: #fff;
  font-weight: bold;
  padding-top: 30px;
  letter-spacing: normal;
  line-height: normal;
  text-transform: uppercase;
  background: linear-gradient(
    -225deg,
    #231557 0%,
    #44107a 29%,
    #ff8d13 67%,
    #ffd500 100%
  ); 
  // Background properties for the text animation
  background-size: auto auto;
  background-clip: border-box;
  color: #fff;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${textclip} 5s linear infinite;
`;

// Main component for the homepage
const Homepage = () => {
  return (
    // Main container for the homepage
    <StyledContainer>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <img src={Students} alt="students" style={{ width: "100%" }} />
        </Grid>
        {/* Grid item for the content */}
        <Grid item xs={12} md={6}>
          {/* Styled paper for the content */}
          <StyledPaper elevation={3}>
            <AnimatedTitle>Edu - 365</AnimatedTitle>
            <StyledText>
              Efficiently manage school administration, organize classes, and
              incorporate both students and faculty seamlessly. Monitor
              attendance, evaluate performance, and deliver feedback seamlessly.
              Easily access records, check grades, and foster effortless
              communication.
            </StyledText>
            <StyledBox>
              {/* Link to the choose user page */}
              <StyledLink to="/choose">
                <DarkBlueButton variant="contained" fullWidth>
                  Login
                </DarkBlueButton>
              </StyledLink>
              <StyledText>
                Don't have an account?{" "}
                <Link to="/Adminregister" style={{ color: "#0008C5" }}>
                  Sign up
                </Link>
              </StyledText>
            </StyledBox>
          </StyledPaper>
        </Grid>
      </Grid>
      <Footer>&copy; 2025 Edu-365. All rights reserved.</Footer> {/* Footer */}

    </StyledContainer>
  );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px; // Padding around the content
  height: 100vh; // Full viewport height
`;

// Styled component for the footer
const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: #FFFF;
  color: black;
  text-align: center;
  padding: 10px 0;
`;

// Styled component for the box
const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

// Styled component for the text
const StyledText = styled.p`
  /* color: #550080; */
  margin-top: 30px;
  margin-bottom: 30px;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
