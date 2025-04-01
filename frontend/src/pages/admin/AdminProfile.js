import React from 'react';
import { useSelector } from 'react-redux';

// Define the AdminProfile component
const AdminProfile = () => {
    // Get the current user from the Redux store
    const { currentUser } = useSelector((state) => state.user);

    // Define the styles for the container
    const containerStyle = {
        maxWidth: '100%',
        margin: '5rem',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        textAlign: 'left',
    };

    // Define the styles for the heading
    const headingStyle = {
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
    };

    // Define the styles for the labels
    const labelStyle = {
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#333',
    };

    // Define the styles for the values
    const valueStyle = {
        marginBottom: '15px',
        color: '#555',
        fontWeight: 'normal', // Ensures the contents are not in bold format
    };

    // Render the component
    return (
        // Main container for the admin profile
        <div style={containerStyle}>
            {/* Heading for the admin profile */}
            <div style={headingStyle}>Admin Profile</div>

            {/* Display the admin's name */}
            <div style={labelStyle}>
                Name: <span style={valueStyle}>{currentUser.name}</span>
            </div>

            <div style={labelStyle}>
                Email: <span style={valueStyle}>{currentUser.email}</span>
            </div>
            
            {/* Display the admin's school name */}
            <div style={labelStyle}>
                School: <span style={valueStyle}>{currentUser.schoolName}</span>
            </div>
        </div>
    );
};
// Export the component
export default AdminProfile;
