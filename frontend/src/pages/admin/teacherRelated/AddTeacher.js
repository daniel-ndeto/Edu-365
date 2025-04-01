// Import necessary modules and components
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress } from '@mui/material';

// Define the AddTeacher component
const AddTeacher = () => {
  // Get parameters from the URL
  const params = useParams()
  // Initialize dispatch and navigate
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Get the subject ID from the URL
  const subjectID = params.id

  // Get data from Redux store
  const { status, response, error } = useSelector(state => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  // Fetch subject details when the component mounts
  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  // State variables for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  // State variables for popup and loader
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false)

  // Define the role and get school, teachSubject, and teachSclass from subjectDetails
  const role = "Teacher"
  const school = subjectDetails && subjectDetails.school
  const teachSubject = subjectDetails && subjectDetails._id
  const teachSclass = subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName._id

  // Define the fields to be submitted
  const fields = { name, email, password, role, school, teachSubject, teachSclass }

  // Handle form submission
  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    // Dispatch action to register a new user
    dispatch(registerUser(fields, role))
  }

  // Handle different statuses after submitting the form
  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl())
      navigate("/Admin/teachers")
    }
    else if (status === 'failed') {
      setMessage(response)
      setShowPopup(true)
      setLoader(false)
    }
    else if (status === 'error') {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <div> {/* Main container for the component */}
      <div className="register"> {/* Container for the registration form */}
        <form className="registerForm" onSubmit={submitHandler}> {/* Registration form */}
          <span className="registerTitle">Add Teacher</span> {/* Title of the form */}
          <br /> {/* Line break */}
          {/* Display subject name */}
          <label>
            Subject : {subjectDetails && subjectDetails.subName} 
          </label>
          {/* Display class name */}
          <label>
            Class : {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName} 
          </label>
          {/* Input field for teacher's name */}
          <label>Name</label> 
          <input className="registerInput" type="text" placeholder="Enter teacher's name..."
            value={name} // Bind the value to the state variable
            onChange={(event) => setName(event.target.value)} // Update the state variable on change
            autoComplete="name" required /> {/* Input field for teacher's name */}

          {/* Input field for teacher's email */}
          <label>Email</label> 
          <input className="registerInput" type="email" placeholder="Enter teacher's email..."
            value={email} // Bind the value to the state variable
            onChange={(event) => setEmail(event.target.value)} // Update the state variable on change
            autoComplete="email" required /> {/* Input field for teacher's email */}

          {/* Input field for teacher's password */}
          <label>Password</label> 
          <input className="registerInput" type="password" placeholder="Enter teacher's password..."
            value={password} // Bind the value to the state variable
            onChange={(event) => setPassword(event.target.value)} // Update the state variable on change
            autoComplete="new-password" required /> {/* Input field for teacher's password */}

          {/* Submit button */}
          <button className="registerButton" type="submit" disabled={loader}> 
            {/* Conditional rendering for loading indicator */}
            {loader ? (
              <CircularProgress size={24} color="inherit" /> // Show loading indicator when loader is true
            ) : (
              'Register' // Show 'Register' text when loader is false
            )}
          </button>
        </form>
      </div>
      {/* Popup component for displaying messages */}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  )
}

export default AddTeacher
