import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Container, Grid, Box, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

const TeacherProfile = () => {
  // Access data from the Redux store using useSelector
  const { currentUser, response, error } = useSelector((state) => state.user);

  // Log response or error if they exist
  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  // Extract class, subject, and school details from the current user data
  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

  return (
    <Container maxWidth="md">
      <StyledCard elevation={3}>
        <CardContent>
          {/* Grid container for the teacher's profile information */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* Avatar section */}
              <Box display="flex" justifyContent="center">
                <Avatar alt="Teacher Avatar" sx={{ width: 150, height: 150 }}>
                  {String(currentUser.name).charAt(0)}
                </Avatar>
                {/* Display the first letter of the teacher's name as the avatar */}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <ProfileText variant="h5">Name: {currentUser.name}</ProfileText>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <ProfileText variant="subtitle1">Email: {currentUser.email}</ProfileText>
                <ProfileText variant="subtitle1">Class: {teachSclass.sclassName}</ProfileText>
                <ProfileText variant="subtitle1">Subject: {teachSubject.subName}</ProfileText>
                <ProfileText variant="subtitle1">School: {teachSchool.schoolName}</ProfileText>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
    </Container>
  );
};

export default TeacherProfile;

const StyledCard = styled(Card)`
  margin-bottom: 20px;
  background-color: white;
`;
const ProfileText = styled(Typography)`
  margin: 10px;
`;
