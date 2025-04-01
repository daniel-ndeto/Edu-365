import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice'; // Import the logout action
import styled from 'styled-components';

const Logout = () => {
    // Access the current user from the Redux store
    const currentUser = useSelector(state => state.user.currentUser); 

    const navigate = useNavigate(); // Hook for navigation
    const dispatch = useDispatch(); // Hook for dispatching Redux actions

    // Function to handle the logout process
    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    // Function to handle the cancel action
    const handleCancel = () => {
        navigate(-1); // Navigate back to the previous page
    };

    // Styled component for the background of the page
    const PageBackground = styled.div`
    background-color: #85769f66;
    height: 100vh;
        display: flex;
    justify-content: center;
    align-items: center;
    `;
    // Render the logout confirmation page
    return (
        <PageBackground>
            <LogoutContainer>
                {/* Display the user's name */}
                <UserName>{currentUser.name}</UserName>
                <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
                <ButtonContainer>
                    <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
                    <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
                </ButtonContainer>
            </LogoutContainer>
        </PageBackground>
    );
};

export default Logout;

// Styled components for styling the logout page

// Container for the logout confirmation box
const LogoutContainer = styled.div`
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 40px;
  
    background-color: #fff; 
    color: black;
  
    align-items: center;
`;
// Style for the user name
const UserName = styled.h1`
    text-align: center;
    font-size:2rem;
    font-family: 'Times New Roman', Times, serif;
`;

// Style for the logout message
const LogoutMessage = styled.p`
    margin-bottom: 20px;
    font-size: 16px;
    text-align: center;
`;

// Base style for the buttons
const LogoutButton = styled.button`
    padding: 6px 12px;
    margin-top: 10px;
    border-radius: 5px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;

    &:hover {
        color: #fff;
        background-color: #333;
    }
`;

// Style for the logout button
const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #ea0606;
`;

// Style for the cancel button
const LogoutButtonCancel = styled(LogoutButton)`
  background-color: rgb(99, 60, 99);
`;
// Container for the buttons
const ButtonContainer = styled.div`
    display: flex;
    justify-content:space-around;
    width: 100%;
    margin-top: 10px;
`;
