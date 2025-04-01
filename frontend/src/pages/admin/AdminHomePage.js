import React, { useState } from "react";
// Import necessary components from Material UI
import { Container, Grid, Paper, Box, Typography } from "@mui/material";
import SeeNotice from "../../components/SeeNotice";
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import styled from "styled-components";
import CountUp from "react-countup";
// Import necessary hooks from react-redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSclasses } from "../../redux/sclassRelated/sclassHandle";
import { getAllStudents } from "../../redux/studentRelated/studentHandle";
import { getAllTeachers } from "../../redux/teacherRelated/teacherHandle";
import addnotice from "../../assets/addnotice.jpg";

const AdminHomePage = () => {
  // Initialize dispatch
  const dispatch = useDispatch();
  // Get data from Redux store
  const { studentsList } = useSelector((state) => state.student);
  const { sclassesList } = useSelector((state) => state.sclass);
  const { teachersList } = useSelector((state) => state.teacher);

  // State to check if there is data
  const [hasData, setHasData] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const addData = () => {
    setHasData(true);
  };

  // Get current user from Redux store
  const { currentUser } = useSelector((state) => state.user);

  // Get admin ID from current user
  const adminID = currentUser._id;

  // Fetch data when the component mounts
  useEffect(() => {
    // Dispatch actions to fetch all students, classes, and teachers
    dispatch(getAllStudents(adminID));
    dispatch(getAllSclasses(adminID, "Sclass"));
    dispatch(getAllTeachers(adminID));
  }, [adminID, dispatch]);

  // Calculate the number of students, classes, and teachers
  const numberOfStudents = studentsList && studentsList.length;
  const numberOfClasses = sclassesList && sclassesList.length;
  const numberOfTeachers = teachersList && teachersList.length;

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Grid container for the dashboard */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Students} alt="Students" />
              <Title>Total Students</Title>
              <Data start={0} end={numberOfStudents} duration={2.5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Classes} alt="Classes" />
              <Title>Total Classes</Title>
              <Data start={0} end={numberOfClasses} duration={5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Teachers} alt="Teachers" />
              <Title>Total Teachers</Title>
              <Data start={0} end={numberOfTeachers} duration={2.5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Fees} alt="Fees" />
              <Title>Fees Collection</Title>
              <Data start={0} end={23000} duration={2.5} prefix="$" />{" "}
            </StyledPaper>
          </Grid>
          {/* Grid item for the notice section */}
          <Grid item xs={12} md={12} lg={12}>
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

// Styled component for the paper
const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  // Space between the elements
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

// Styled component for the title
const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + 0.6vw);
  color: green;
`;

export default AdminHomePage;
