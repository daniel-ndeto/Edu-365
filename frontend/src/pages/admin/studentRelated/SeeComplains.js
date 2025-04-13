// Import necessary modules and components
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper, Box, Checkbox
} from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';

// Define the SeeComplains component
const SeeComplains = () => {
  // Initialize dispatch and get data from Redux store
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector(state => state.complain);
  const { currentUser } = useSelector(state => state.user);

  // Fetch all complains when the component mounts
  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  // Log any errors to the console
  if (error) {
    console.error(error);
  }

  // Define the columns for the complains table
  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  // Map the complains data to the table rows format
  const complainRows = complainsList?.map(complain => ({
    user: complain.user?.name || "Unknown User", // Safely access user.name or provide a fallback
    complaint: complain.complaint || "No complaint provided", // Fallback for missing complaint
    date: complain.date ? new Date(complain.date).toISOString().substring(0, 10) : "Unknown Date", // Fallback for missing date
    id: complain._id || "No ID", // Fallback for missing ID
  }));
  
  // Define a component for the button in each row of the table
  const ComplainButtonHaver = () => <Checkbox inputProps={{ 'aria-label': 'Checkbox demo' }} />;

  // Render the component
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : response ? (
        /* Box to center the message */
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div>
            {/* Message to show when there are no complains */}
            No Complains Right Now
          </div>
        </Box>
      ) : (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          {Array.isArray(complainsList) && complainsList.length > 0 && (
            <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
          )}
        </Paper>
      )}
    </>
  );
};
  
// Export the component
export default SeeComplains;
