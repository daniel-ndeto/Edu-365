import * as React from 'react'; 
import { useDispatch } from 'react-redux'; 
import { underControl } from '../redux/userRelated/userSlice'; 
import { underStudentControl } from '../redux/studentRelated/studentSlice'; 
import MuiAlert from '@mui/material/Alert'; 
import { Snackbar } from '@mui/material'; 

// Popup component for displaying success or error messages
const Popup = ({ message, setShowPopup, showPopup }) => {
    // Initialize dispatch function from react-redux
    const dispatch = useDispatch(); 

    // Define the vertical and horizontal position for the Snackbar
    const vertical = "top"; 
    const horizontal = "right"; 

    // Function to handle the closing of the Snackbar
    const handleClose = (event, reason) => {
        // If the reason for closing is 'clickaway', it means the user clicked outside the Snackbar, so we do nothing
        if (reason === 'clickaway') {
            return;
        }
        // Hide the popup by setting showPopup to false
        setShowPopup(false); 
        // Dispatch the underControl action to reset the user-related state
        dispatch(underControl()); 
        // Dispatch the underStudentControl action to reset the student-related state
        dispatch(underStudentControl()); 
    };

    return (
        <>
           
            <Snackbar open={showPopup} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                {
                    // Check if the message is "Done Successfully" to determine the type of alert to display
                    (message === "Done Successfully") ?
                        // Display a success alert if the message is "Done Successfully"
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                        :
                        // Display an error alert for any other message
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                }
            </Snackbar>
        </>
    );
};
// Export the Popup component so it can be used in other parts of the application
export default Popup; 

// Custom Alert component that wraps MuiAlert
const Alert = React.forwardRef(function Alert(props, ref) {
    // Forward ref to the MuiAlert component
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
