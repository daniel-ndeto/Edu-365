// Import necessary modules and components
import React, { useState } from "react";
import { Container, Grid, Paper, Box, Typography } from "@mui/material";
import SeeNotice from "../../components/SeeNotice";
import CountUp from "react-countup";
import styled from "styled-components";
import Students from "../../assets/img1.png";
import Lessons from "../../assets/subjects.svg";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";
import {
  getClassStudents,
  getSubjectDetails,
} from "../../redux/sclassRelated/sclassHandle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import addnotice from "../../assets/addnotice.jpg";

// Define the TeacherHomePage component
const TeacherHomePage = () => {
  const dispatch = useDispatch();
  const [hasData, setHasData] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const addData = () => {
    setHasData(true);
  };

  // Select data from the Redux store
  const { currentUser } = useSelector((state) => state.user);
  const { subjectDetails, sclassStudents } = useSelector(
    (state) => state.sclass
  );

  // Extract class ID and subject ID from the current user's data
  const classID = currentUser.teachSclass?._id;
  const subjectID = currentUser.teachSubject?._id;

  // Fetch subject details and class students on component mount and when dependencies change
  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  // Calculate the number of students and sessions
  const numberOfStudents = sclassStudents && sclassStudents.length;
  const numberOfSessions = subjectDetails && subjectDetails.sessions;

  return (
    <>
      {/* Main container */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Students} alt="Students" />
              <Title>Class Students</Title>
              <Data start={0} end={numberOfStudents} duration={2.5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Lessons} alt="Lessons" />
              <Title>Total Lessons</Title>
              <Data start={0} end={numberOfSessions} duration={5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Tests} alt="Tests" />
              <Title>Tests Taken</Title>
              <Data start={0} end={24} duration={4} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Time} alt="Time" />
              <Title>Total Hours</Title>
              <Data start={0} end={30} duration={4} suffix="hrs" />{" "}
            </StyledPaper>
          </Grid>
          <Grid item xs={12}>
            {/* Notice board */}
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              {hasData ? (
                <SeeNotice />
              ) : (
                <Box sx={{ textAlign: "center", mt: "40px" }}>
                  <img
                    src={addnotice}
                    alt="No Data"
                    style={{ maxWidth: "100%", maxHeight: "225px" }}
                  />
                  <Typography variant="h5" component="div" mt={0.5}>
                    No Notice found
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

// Styled components for styling
const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + 0.6vw);
  color: green;
`;

// Export the TeacherHomePage component
export default TeacherHomePage;
