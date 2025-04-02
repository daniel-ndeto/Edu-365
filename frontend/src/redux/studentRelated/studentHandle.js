import axios from "axios";
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  stuffDone,
} from "./studentSlice";

// const REACT_APP_BASE_URL = "https://edu-365-back.vercel.app/"; // Base URL for API requests (commented out)

// Async action to fetch all students
export const getAllStudents = (id) => async (dispatch) => {
  dispatch(getRequest()); // Dispatch getRequest to indicate the start of the request

  // Try to make an asynchronous GET request to the specified URL
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/Students/${id}`
    );

    // Check if the response contains a message indicating an error
    if (result.data.message) {
      dispatch(getFailed(result.data.message)); // Dispatch getFailed with the error message
    } else {
      dispatch(getSuccess(result.data)); // Dispatch getSuccess with the retrieved data
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const updateStudentFields =
  (id, fields, address) => async (dispatch) => { // Async action to update student fields
    dispatch(getRequest()); // Dispatch getRequest to indicate the start of the request

    // Try to make an asynchronous PUT request to the specified URL
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/${address}/${id}`,
        fields,
        {
          headers: { "Content-Type": "application/json" }, // Set the content type to JSON
        }
      );

      // Check if the response contains a message indicating an error
      if (result.data.message) {
        dispatch(getFailed(result.data.message)); // Dispatch getFailed with the error message
      } else {
        dispatch(stuffDone()); // Dispatch stuffDone to indicate successful update
      }
    } catch (error) {
      dispatch(getError(error));
    }
  };

export const removeStuff = (id, address) => async (dispatch) => {
  dispatch(getRequest()); // Dispatch getRequest to indicate the start of the request

  // Try to make an asynchronous PUT request to the specified URL
  try {
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/${address}/${id}`
    );
    // Check if the response contains a message indicating an error
    if (result.data.message) {
      dispatch(getFailed(result.data.message)); // Dispatch getFailed with the error message
    } else {
      dispatch(stuffDone()); // Dispatch stuffDone to indicate successful removal
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
