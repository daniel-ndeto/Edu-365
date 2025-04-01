// Importing necessary modules and components from React, Redux, and Material-UI
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress } from '@mui/material'; // Import CircularProgress
import Popup from '../../../components/Popup';

// Functional component for adding a new notice
const AddNotice = () => {
  // Hooks for dispatching actions and navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Selecting data from the Redux store
  const { status, response, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  // State variables for form fields and UI elements
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const adminID = currentUser._id

  // State variables for loading state, popup visibility, and message
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  // Object containing the form fields and the address for the API call
  const fields = { title, details, date, adminID };
  const address = "Notice"

  // Handler for form submission
  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    // Dispatching the addStuff action to add the new notice
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/notices');
      dispatch(underControl())
      // Handling error status
    } else if (status === 'error') {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch]);

  // Rendering the component
  return (
    <>
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">Add Notice</span>
          <label>Title</label>
          <input className="registerInput" type="text" placeholder="Enter notice title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required />

          <label>Details</label>
          <input className="registerInput" type="text" placeholder="Enter notice details..."
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            required />

          <label>Date</label>
          <input className="registerInput" type="date" placeholder="Enter notice date..."
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required />
         
          <button className="registerButton" type="submit" disabled={loader}>
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Add'
            )}
          </button>
        </form>
        {/* Displaying the popup */}
      </div>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

// Exporting the component
export default AddNotice;
