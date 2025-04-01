/* eslint-disable no-unused-vars */
// Importing necessary modules and components from React, Redux, Material-UI, and custom components
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Paper, Box, IconButton, Typography } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllNotices } from "../../../redux/noticeRelated/noticeHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import TableTemplate from "../../../components/TableTemplate";
import { GreenButton, ButtonContainer } from "../../../components/buttonStyles";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import nodata from "../../../assets/nodata.png";

// Functional component for displaying notices
const ShowNotices = () => {
  // Hooks for navigation and dispatching actions
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Selecting data from the Redux store
  const { noticesList, loading, error, response } = useSelector(
    (state) => state.notice
  );
  const { currentUser } = useSelector((state) => state.user);

  // Fetching all notices on component mount
  useEffect(() => {
    dispatch(getAllNotices(currentUser._id, "Notice"));
  }, [currentUser._id, dispatch]);

  // Logging error if any
  if (error) {
    console.log(error);
  }

  // Handler for deleting a notice
  const deleteHandler = (deleteID, address) => {
    // Dispatching deleteUser action to delete the notice
    dispatch(deleteUser(deleteID, address)).then(() => {
      // Fetching all notices again after deletion
      dispatch(getAllNotices(currentUser._id, "Notice"));
    });
  };

  // Defining columns for the table
  const noticeColumns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "details", label: "Details", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 170 },
  ];

  // Mapping notices data to table rows
  const noticeRows =
    noticesList &&
    noticesList.length > 0 &&
    noticesList.map((notice) => {
      const date = new Date(notice.date);
      const dateString =
        date.toString() !== "Invalid Date"
          ? date.toISOString().substring(0, 10)
          : "Invalid Date";
      return {
        title: notice.title,
        details: notice.details,
        date: dateString,
        id: notice._id,
      };
    });

  // Component for rendering buttons in each row
  const NoticeButtonHaver = ({ row }) => {
    return (
      <>
        <IconButton onClick={() => deleteHandler(row.id, "Notice")}>
          <DeleteIcon color="error" />
        </IconButton>
      </>
    );
  };

  // Defining actions for the speed dial
  const actions = [
    {
      icon: <NoteAddIcon color="primary" />,
      name: "Add New Notice",
      action: () => navigate("/Admin/addnotice"),
    },
    {
      icon: <DeleteIcon color="error" />,
      name: "Delete All Notices",
      action: () => deleteHandler(currentUser._id, "Notices"),
    },
  ];

  // Rendering the component
  return (
    <>
      {/* Displaying loading message while data is being fetched */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          {/* Displaying table if notices are available */}
          {Array.isArray(noticesList) && noticesList.length > 0 ? (
            <> 
              <TableTemplate
                buttonHaver={NoticeButtonHaver}
                columns={noticeColumns}
                rows={noticeRows}
              />
              <SpeedDialTemplate actions={actions} />
            </>
            // Displaying no data message if no notices are available
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "300px",
                marginBottom: "16px",
              }}
            >
              <img
                src={nodata}
                alt="No Data"
                style={{ maxWidth: "100%", maxHeight: "225px" }}
              />
              <Typography variant="h5" sx={{ marginTop: "16px" }}>
                No notices found
              </Typography>
              <ButtonContainer sx={{ marginTop: "16px" }}>
                <GreenButton
                  variant="contained"
                  onClick={() => navigate("/Admin/addnotice")}
                >
                  Add Notice
                </GreenButton>
              </ButtonContainer>
            </Box>
          )}
        </Paper>
        // End of loading condition
      )}
    </>
  );
};

export default ShowNotices;
