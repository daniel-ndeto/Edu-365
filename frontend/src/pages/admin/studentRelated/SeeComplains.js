import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper, Box, Checkbox
} from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';
// import {nocomplains} from '../../../nocomplains.jpg';

const SeeComplains = () => {
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector(state => state.complain);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.error(error);
  }

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const complainRows = complainsList?.map(complain => ({
    user: complain.user.name,
    complaint: complain.complaint,
    date: new Date(complain.date).toISOString().substring(0, 10),
    id: complain._id,
  }));

  const ComplainButtonHaver = () => <Checkbox inputProps={{ 'aria-label': 'Checkbox demo' }} />;

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : response ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div>
         
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

export default SeeComplains;
