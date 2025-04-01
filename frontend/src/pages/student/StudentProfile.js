// Import necessary modules and components from React and Material UI
import React from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
  Container,
  Paper,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Define the StudentProfile component
const StudentProfile = () => {
  // Access data from the Redux store using useSelector
  const { currentUser, response, error } = useSelector((state) => state.user);

  // Log response or error if they exist
  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  // Extract class name and school details from the current user data
  // These are used to display the student's class and school information
  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  return (
    <Container maxWidth="md">
      <StyledCard elevation={3}>
        <CardContent>
          {/* Grid container for the student's profile information */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* Avatar section */}
              <Box display="flex" justifyContent="center">
                <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
                  {String(currentUser.name).charAt(0)}
                </Avatar>
                {/* Display the first letter of the student's name as the avatar */}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h5" component="h2" textAlign="center">
                  {currentUser.name}
                </Typography>
                {/* Display the student's name */}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography
                  variant="subtitle1"
                  component="p"
                  textAlign="center"
                >
                  Student Roll No: {currentUser.rollNum}
                </Typography>
                {/* Display the student's roll number */}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography
                  variant="subtitle1"
                  component="p"
                  textAlign="center"
                >
                  Class: {sclassName.sclassName}
                </Typography>
                {/* Display the student's class */}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography
                  variant="subtitle1"
                  component="p"
                  textAlign="center"
                >
                  School: {studentSchool.schoolName}
                </Typography>
                {/* Display the student's school name */}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography
                  variant="subtitle1"
                  component="p"
                  textAlign="center"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/student/form"
                  >
                    Fill Personal Info
                    {/* Button to navigate to the student form page */}
                  </Button>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
      <Paper elevation={3}>
        {/* Paper component to display personal information */}
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          {/* Grid container for personal information */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Date of Birth:</strong> {currentUser.dateOfBirth}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Gender:</strong> {currentUser.gender}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Email:</strong> {currentUser.email}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Phone:</strong> {currentUser.phone}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Address:</strong> {currentUser.address}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Emergency Contact:</strong>{" "}
                {currentUser.emergencyContact}
              </Typography>
            </Grid>
            
            {/* Display the student's emergency contact */}
          </Grid>
        </CardContent>
      </Paper>
    </Container>
  );
};

// Export the StudentProfile component
export default StudentProfile;

// Styled component for the card
const StyledCard = styled(Card)`
  margin-bottom: 20px;
  background-color: white;
`;
