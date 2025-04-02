import axios from "axios";
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  postDone,
  doneSuccess,
} from "./teacherSlice";

//const REACT_APP_BASE_URL="http://localhost:5000"

// Async action to fetch all teachers
export const getAllTeachers = (id) => async (dispatch) => {
  dispatch(getRequest()); // Dispatch getRequest to indicate the start of the request

  // Try to make an asynchronous GET request to the specified URL
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/Teachers/${id}`
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

export const getTeacherDetails = (id) => async (dispatch) => {
  dispatch(getRequest()); // Dispatch getRequest to indicate the start of the request

  // Try to make an asynchronous GET request to the specified URL
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/Teacher/${id}`
    );

    // Dispatch doneSuccess with the retrieved data
    if (result.data) {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const updateTeachSubject =
  (teacherId, teachSubject) => async (dispatch) => {
    dispatch(getRequest()); // Dispatch getRequest to indicate the start of the request

    // Try to make an asynchronous PUT request to the specified URL
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/TeacherSubject`,
        { teacherId, teachSubject },
        {
          headers: { "Content-Type": "application/json" }, // Set the content type to JSON
        }
      );

      dispatch(postDone()); // Dispatch postDone to indicate successful update

    } catch (error) {
      dispatch(getError(error));
    }
  };
