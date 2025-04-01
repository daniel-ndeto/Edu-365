
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Paper, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TableTemplate from "../../../components/TableTemplate";
import {
  BlueButton,
  GreenButton,
  ButtonContainer,
} from "../../../components/buttonStyles";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";

const ShowSubjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subjectsList, loading, error, response } = useSelector(
    (state) => state.sclass
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch all subjects when the component mounts
    dispatch(getSubjectList(currentUser._id, "AllSubjects"));
  }, [currentUser._id, dispatch]);

  // Log any errors to the console
  if (error) {
    console.log(error);
  }

  // State for managing popup messages
  const [showPopup, setShowPopup] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState("");

  // Function to handle subject deletion
  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);

    // Dispatch action to delete a subject
    dispatch(deleteUser(deleteID, address))
        .then(() => {
            // After deletion, fetch the updated list of subjects
            dispatch(getSubjectList(currentUser._id, "AllSubjects"));
        })
  };

  // Define the columns for the subjects table
  const subjectColumns = [
    { id: "subName", label: "Sub Name", minWidth: 170 },
    { id: "sessions", label: "Sessions", minWidth: 170 },
    { id: "sclassName", label: "Class", minWidth: 170 },
  ];

  // Map the subjects data to the table rows format
  const subjectRows = subjectsList.map((subject) => {
    return {
      // Extract relevant data from each subject
      subName: subject.subName,
      sessions: subject.sessions,
      sclassName: subject.sclassName.sclassName,
      sclassID: subject.sclassName._id,
      id: subject._id,
    };
  });
  
  // Define a component for the button in each row of the table
  const SubjectsButtonHaver = ({ row }) => {
    return (
      <>
        <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
          <DeleteIcon color="error" />
        </IconButton>
        <BlueButton
          // Button to view the details of a subject
          variant="contained"
          onClick={() =>
            navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)
          }
        >
          View
        </BlueButton>
      </>
    );
  };

  // Define the actions for the speed dial
  const actions = [
    {
      icon: <PostAddIcon color="primary" />,
      name: "Add New Subject",
      action: () => navigate("/Admin/subjects/chooseclass"),
    },
    {
      icon: <DeleteIcon color="error" />,
      name: "Delete All Subjects",
      action: () => deleteHandler(currentUser._id, "Subjects"),
    },
  ];

  // Render the component
  return (
    <>
      {/* Conditional rendering based on loading state */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* Conditional rendering based on whether there are subjects */}
          {response ? (
            // Box to center the message
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
              }}
            > 
            {/* Button to add new subjects */}
              <ButtonContainer>
                <GreenButton
                  variant="contained"
                  onClick={() => navigate("/Admin/subjects/chooseclass")}
                >
                  Add Subjects
                </GreenButton>
              </ButtonContainer>
            </Box>
          ) : (
            // Table to show the subjects
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              {Array.isArray(subjectsList) && subjectsList.length > 0 && (
                // TableTemplate component to display the subjects
                <TableTemplate
                  buttonHaver={SubjectsButtonHaver}
                  columns={subjectColumns}
                  rows={subjectRows}
                />
              )}
              <SpeedDialTemplate actions={actions} />
            </Paper>
          )}
        </>
      )}
      {/* Popup component for displaying messages */}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default ShowSubjects;
