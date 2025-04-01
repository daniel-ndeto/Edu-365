// Import necessary modules and components
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material'
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate } from 'react-router-dom';
import { PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
// Define the ChooseClass component
const ChooseClass = ({ situation }) => {
    // Initialize navigation and dispatch
    const navigate = useNavigate()
    const dispatch = useDispatch();

    // Get data from Redux store
    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user)

    // Fetch all classes when the component mounts
    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [currentUser._id, dispatch]);

    // Log any errors to the console
    if (error) {
        console.log(error)
    }

    // Function to handle navigation based on the situation
    const navigateHandler = (classID) => {
        // If the situation is "Teacher", navigate to the choose subject page
        if (situation === "Teacher") {
            navigate("/Admin/teachers/choosesubject/" + classID)
        }
        // If the situation is "Subject", navigate to the add subject page
        else if (situation === "Subject") {
            navigate("/Admin/addsubject/" + classID)
        }
    }

    // Define the columns for the classes table
    const sclassColumns = [
        { id: 'name', label: 'Class Name', minWidth: 170 },
    ]

    // Map the classes data to the table rows format
    const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
        return {
            name: sclass.sclassName,
            id: sclass._id,
        };
    })
    // Define a component for the button in each row of the table
    const SclassButtonHaver = ({ row }) => {
        return (
            <>
                {/* Button to choose a class */}
                <PurpleButton variant="contained"
                    onClick={() => navigateHandler(row.id)}>
                    Choose
                </PurpleButton>
            </>
        );
    }; 

    // Render the component
    return (
        <>
            {/* Conditional rendering based on loading state */}
            {loading ?
                <div>Loading...</div>
                :
                // Conditional rendering based on whether there are classes
                <>
                    {getresponse ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <Button variant="contained" onClick={() => navigate("/Admin/addclass")}>
                                Add Class
                            </Button>
                        </Box>
                        // Table to show the classes
                        :
                        <>
                            {/* Title for the classes section */}
                            <Typography variant="h6" gutterBottom component="div">
                                Choose a class
                            </Typography>
                            {/* Conditional rendering based on whether there are classes */}
                            {Array.isArray(sclassesList) && sclassesList.length > 0 &&
                                // TableTemplate component to display the classes
                                <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
                            }
                        </>}
                </>
            }
        </>
    );
}
// Export the component
export default ChooseClass
