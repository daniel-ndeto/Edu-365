// Import necessary modules and components
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress } from '@mui/material';
// eslint-disable-next-line no-unused-vars
import  nodata  from '../../../assets/nodata.png';

// Define the AddStudent component
const AddStudent = ({ situation }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('');
    const [sclassName, setSclassName] = useState('');
    
    // Get the admin ID and set the role to "Student"
    const adminID = currentUser._id;
    const role = "Student";
    const attendance = [];

    useEffect(() => {
        // If the situation is "Class", set the sclassName from the URL parameter
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    // Fetch all classes when the component mounts
    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        // Handle class selection change
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    };

    // Define the fields to be submitted
    const fields = { name, rollNum, password, sclassName, adminID, role, attendance };

    const submitHandler = (event) => {
        event.preventDefault();
        // Check if a class is selected
        if (sclassName === "") {
            setMessage("Please select a classname");
            setShowPopup(true);
        }
        else {
            setLoader(true);
            dispatch(registerUser(fields, role));
        }
    };

    useEffect(() => {
        // Handle different statuses after submitting the form
        if (status === 'added') {
            dispatch(underControl());
            navigate(-1);
        }
        else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        }
        else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <>
            {/* Main container for the registration form */}
                <div className="register">
                    <form className="registerForm" onSubmit={submitHandler}>
                        <span className="registerTitle">Add Student</span>
                        <label>Name</label>
                        {/* Input field for student's name */}
                        <input className="registerInput" type="text" placeholder="Enter student's name..."
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="name" required />

                        {
                            situation === "Student" &&
                            // Class selection dropdown (only shown when situation is "Student")
                            <>
                                <label>Class</label>
                                <select
                                    className="registerInput"
                                    value={className}
                                    onChange={changeHandler} required>
                                    <option value='Select Class'>Select Class</option>
                                    {sclassesList.map((classItem, index) => (
                                        <option key={index} value={classItem.sclassName}>
                                            {classItem.sclassName}
                                        </option>
                                    ))}
                                </select>
                            </>
                        }

                        {/* Input field for student's roll number */}
                        <label>Roll Number</label>
                        <input className="registerInput" type="number" placeholder="Enter student's Roll Number..."
                            value={rollNum}
                            onChange={(event) => setRollNum(event.target.value)}
                            required />

                        <label>Password</label>
                        {/* Input field for student's password */}
                        <input className="registerInput" type="password" placeholder="Enter student's password..."
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="new-password" required />

                        <button className="registerButton" type="submit" disabled={loader}>
                            {/* Submit button with loading indicator */}
                            {loader ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Add'
                            )}
                        </button>
                    </form>
                </div>
            {/* Popup component for displaying messages */}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default AddStudent;
