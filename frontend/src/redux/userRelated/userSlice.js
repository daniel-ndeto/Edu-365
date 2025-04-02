// Import the createSlice function from the @reduxjs/toolkit library
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
    userDetails: [],
    tempDetails: [],
    loading: false,
    currentUser: JSON.parse(localStorage.getItem('user')) || null,
    currentRole: (JSON.parse(localStorage.getItem('user')) || {}).role || null,
    error: null,
    response: null,
    darkMode: true
};

// Create a slice of the Redux store for user-related data
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
        authRequest: (state) => {
            state.status = 'loading';
            // Set the status to 'loading' when an authentication request is made
        },

        underControl: (state) => {
            state.status = 'idle';
            state.response = null;
            // Reset the status to 'idle' and clear the response
        },

        stuffAdded: (state, action) => {
            state.status = 'added';
            state.response = null;
            state.error = null;
            state.tempDetails = action.payload; // Store temporary details
            // Set the status to 'added', clear the response and error, and store temporary details
        },

        authSuccess: (state, action) => {
            state.status = 'success';
            state.currentUser = action.payload;
            state.currentRole = action.payload.role;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Store user data in local storage
            state.response = null;
            state.error = null;
            // Set the status to 'success', store user data, set the current role, clear the response and error
        },

        authFailed: (state, action) => {
            state.status = 'failed';
            state.response = action.payload;
            // Set the status to 'failed' and store the response
        },

        authError: (state, action) => {
            state.status = 'error';
            state.error = action.payload;
            // Set the status to 'error' and store the error
        },

        authLogout: (state) => {
            localStorage.removeItem('user'); // Remove user data from local storage
            state.currentUser = null;
            state.status = 'idle';
            state.error = null;
            state.currentRole = null
            // Remove user data from local storage, clear user data, reset the status, clear the error, and clear the current role
        },

        doneSuccess: (state, action) => {
            state.userDetails = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
            // Store user details, set loading to false, clear the error and response
        },

        getDeleteSuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
            // Set loading to false, clear the error and response
        },

        getRequest: (state) => {
            state.loading = true;
            // Set loading to true when a request is made
        },

        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
            // Store the response, set loading to false, and clear the error
        },

        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
            // Set loading to false and store the error message
        },

        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
            // Toggle the dark mode state
        }
    },
});

export const {
    authRequest,
    underControl,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
    toggleDarkMode
} = userSlice.actions;

// Export the reducer function
export const userReducer = userSlice.reducer;
