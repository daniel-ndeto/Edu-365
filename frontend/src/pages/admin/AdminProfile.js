import React from 'react';
import { useSelector } from 'react-redux';

const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

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

    const headingStyle = {
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
    };

    const labelStyle = {
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#333',
    };

    const valueStyle = {
        marginBottom: '15px',
        color: '#555',
        fontWeight: 'normal', // Ensures the contents are not in bold format
    };

    return (
        <div style={containerStyle}>
            <div style={headingStyle}>Admin Profile</div>

            <div style={labelStyle}>
                Name: <span style={valueStyle}>{currentUser.name}</span>
            </div>

            <div style={labelStyle}>
                Email: <span style={valueStyle}>{currentUser.email}</span>
            </div>

            <div style={labelStyle}>
                School: <span style={valueStyle}>{currentUser.schoolName}</span>
            </div>
        </div>
    );
};

export default AdminProfile;
