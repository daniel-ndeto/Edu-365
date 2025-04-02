import axios from "axios";
import {
  authRequest,
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
} from "./userSlice";

// const REACT_APP_BASE_URL = "http://localhost:5000"; // Base URL for API requests (commented out)
// const REACT_APP_BASE_URL ="https://edu-365-back.vercel.app/" // Base URL for API requests (commented out)

export const loginUser = (fields, role) => async (dispatch) => { // Async action to log in a user
  dispatch(authRequest());

  // Try to make an asynchronous POST request to the specified URL
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/${role}Login`,
      fields,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // Check
    if (result.data.role) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(authFailed(result.data.message)); // Dispatch authFailed with the error message
    }
  } catch (error) {
    dispatch(authError(error)); // Dispatch authError with the error object
  }
};


export const registerUser = (fields, role) => async (dispatch) => { // Async action to register a user
  dispatch(authRequest());

  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/${role}Reg`,
      fields,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (result.data.schoolName) {
      dispatch(authSuccess(result.data)); // Dispatch authSuccess with the retrieved data
    } else if (result.data.school) {
      dispatch(stuffAdded()); // Dispatch stuffAdded to indicate successful addition
    } else {
      dispatch(authFailed(result.data.message)); // Dispatch authFailed with the error message
    }
  } catch (error) {
    dispatch(authError(error)); // Dispatch authError with the error object
  }
};

export const logoutUser = () => (dispatch) => { // Action to log out a user
  dispatch(authLogout()); // Dispatch authLogout to clear user data
}; 

export const getUserDetails = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/${address}/${id}`
    );

    if (result.data) {
      dispatch(doneSuccess(result.data)); // Dispatch doneSuccess with the retrieved data
    }
  } catch (error) {
    dispatch(getError(error)); // Dispatch getError with the error object
  }
};

export const deleteUser = (id, address) => async (dispatch) => { // Async action to delete a user
  dispatch(getRequest());

  try {
    const result = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/${address}/${id}`
    );
    if (result.data.message) {
      dispatch(getFailed(result.data.message)); // Dispatch getFailed with the error message
    } else {
      dispatch(getDeleteSuccess()); // Dispatch getDeleteSuccess to indicate successful deletion
    }
  } catch (error) {
    dispatch(getError(error)); // Dispatch getError with the error object
  }
};

export const updateUser = (fields, id, address) => async (dispatch) => { // Async action to update a user
  dispatch(getRequest());

  try {
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/${address}/${id}`,
      fields,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (result.data.schoolName) {
      dispatch(authSuccess(result.data)); // Dispatch authSuccess with the retrieved data
    } else {
      dispatch(doneSuccess(result.data)); // Dispatch doneSuccess with the retrieved data
    }
  } catch (error) {
    dispatch(getError(error)); // Dispatch getError with the error object
  }
};

export const addStuff = (fields, address) => async (dispatch) => { // Async action to add stuff
  dispatch(authRequest());

  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/${address}Create`,
      fields,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (result.data.message) {
      dispatch(authFailed(result.data.message)); // Dispatch authFailed with the error message
    } else {
      dispatch(stuffAdded(result.data)); // Dispatch stuffAdded with the retrieved data
    }
  } catch (error) {
    dispatch(authError(error)); // Dispatch authError with the error object
  }
};
