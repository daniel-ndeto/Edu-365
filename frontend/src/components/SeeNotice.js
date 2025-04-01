import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import { Paper } from '@mui/material';
import TableViewTemplate from './TableViewTemplate';

const SeeNotice = () => {
    // Initialize dispatch function from react-redux
    const dispatch = useDispatch();

    // Access current user and role from the Redux store
    const { currentUser, currentRole } = useSelector(state => state.user);
    // Access notices data from the Redux store
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);

    // Fetch notices when the component mounts or when dependencies change
    useEffect(() => {
        // Check if the current user is an Admin
        if (currentRole === "Admin") {
            // Dispatch action to get all notices for the Admin
            dispatch(getAllNotices(currentUser._id, "Notice"));
        }
        else {
            // Dispatch action to get all notices for the school
            dispatch(getAllNotices(currentUser.school._id, "Notice"));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    // Log error if any
    if (error) {
        console.log(error); // Log the error to the console
    }

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];
    // Map the noticesList to the format required by the TableViewTemplate
    const noticeRows = noticesList.map((notice) => {
        // Create a new Date object from the notice date
        const date = new Date(notice.date);
        // Format the date to YYYY-MM-DD or "Invalid Date" if the date is invalid
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            // Extract the title from the notice
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    });
    return (
        <div style={{ marginTop: '50px', marginRight: '20px' }}>
            {/* Show loading message while data is being fetched */}
            {loading ? (
                <div style={{ fontSize: '20px' }}>Loading...</div>
            // Show message if there are no notices
            ) : response ? (
                <div style={{ fontSize: '20px' }}>No Notices to Show Right Now</div>
            ) : (
                <>
                    <h3 style={{ fontSize: '30px', marginBottom: '40px' }}>Notices</h3>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        {Array.isArray(noticesList) && noticesList.length > 0 &&
                            // Render the TableViewTemplate with the notice data
                            <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
                        }
                    </Paper>
                </>
            )}
        </div>

    )
}

export default SeeNotice
