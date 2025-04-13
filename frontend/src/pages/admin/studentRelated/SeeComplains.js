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

  // Filter out invalid complaints before mapping
  const validComplainsList = complainsList?.filter(complain => {
    if (!complain || !complain.user || !complain.user.name) {
      console.warn("Invalid complaint data:", complain);
      return false; // Filter out this complaint
    }
    return true; // Keep valid complaints
  });

  // Map the valid complains data to the table rows format
  const complainRows = validComplainsList?.map(complain => ({
    user: complain.user.name,
    complaint: complain.complaint || "No complaint provided",
    date: complain.date ? new Date(complain.date).toISOString().substring(0, 10) : "Unknown Date",
    id: complain._id || "No ID",
  })) || []; // Ensure an empty array if validComplainsList is undefined

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
