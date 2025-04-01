// Import necessary modules and components
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTeachers } from "../../../redux/teacherRelated/teacherHandle";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { StyledTableCell, StyledTableRow } from "../../../components/styles";
import { BlueButton, GreenButton, ButtonContainer } from "../../../components/buttonStyles";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
// eslint-disable-next-line no-unused-vars
import nodata from "../../../assets/nodata.png";

// Define the ShowTeachers component
const ShowTeachers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teachersList, loading, error, response } = useSelector(
    (state) => state.teacher
  );
  const { currentUser } = useSelector((state) => state.user);

  // Fetch all teachers when the component mounts
  useEffect(() => {
    dispatch(getAllTeachers(currentUser._id));
  }, [currentUser._id, dispatch]);

  // State variables for popup and message
  const [showPopup, setShowPopup] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState("");

  // Conditional rendering based on loading state
  if (loading) {
    return <div>Loading...</div>;
  } else if (response) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
        // Button to add a new teacher
      >
        <ButtonContainer>
          <GreenButton
          variant="contained"
          onClick={() => navigate("/Admin/teachers/chooseclass")}
        >
            Add Teacher
          </GreenButton>
        </ButtonContainer>
      </Box>
    );
  } 
  // Log any errors to the console
  else if (error) {
    console.log(error);
  }
  // Function to handle teacher deletion
  const deleteHandler = (deleteID, address) => { 
    console.log(deleteID);
    console.log(address);

    dispatch(deleteUser(deleteID, address)).then(() => {
        dispatch(getAllTeachers(currentUser._id));
    });
  };

  // Define the columns for the teachers table
  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "teachSubject", label: "Subject", minWidth: 100 },
    { id: "teachSclass", label: "Class", minWidth: 170 },
  ];
  // Map the teachers data to the table rows format
  const rows = teachersList.map((teacher) => { 
    return {
      name: teacher.name,
      teachSubject: teacher.teachSubject?.subName || null,
      teachSclass: teacher.teachSclass.sclassName,
      teachSclassID: teacher.teachSclass._id,
      id: teacher._id,
    };
  });

  // Define the actions for the speed dial
  const actions = [
    {
      icon: <PersonAddAlt1Icon color="primary" />,
      name: "Add New Teacher",
      action: () => navigate("/Admin/teachers/chooseclass"),
    },
    {
      icon: <PersonRemoveIcon color="error" />,
      name: "Delete All Teachers",
      action: () => deleteHandler(currentUser._id, "Teachers"),
    },
  ];

  // Render the component
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          {/* Table header */}
          <TableHead>
            <StyledTableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
              <StyledTableCell align="center">Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          {/* Table body */}
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                  >
                    {/* Table cells */}
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "teachSubject") {
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            {value ? (
                              value
                            ) : (
                              <Button
                                variant="contained"
                                onClick={() => {
                                  navigate(
                                    `/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`
                                  );
                                }}
                              >
                                Add Subject
                              </Button>
                            )}
                          </StyledTableCell>
                        );
                      }
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </StyledTableCell>
                      );
                    })}
                    {/* Actions cell */}
                    <StyledTableCell align="center">
                      <IconButton
                        onClick={() => deleteHandler(row.id, "Teacher")}
                      >
                        <PersonRemoveIcon color="error" />
                      </IconButton>
                      <BlueButton
                        variant="contained"
                        onClick={() =>
                          navigate("/Admin/teachers/teacher/" + row.id)
                        }
                      >
                        View
                      </BlueButton>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
        {/* Table pagination */}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 5));
          setPage(0);
        }}
      />
      {/* Speed dial and popup */}
      <SpeedDialTemplate actions={actions} />
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </Paper>
  );
};

export default ShowTeachers;
