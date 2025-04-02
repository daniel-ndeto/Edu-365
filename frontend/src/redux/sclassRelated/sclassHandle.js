import axios from "axios";
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  getStudentsSuccess,
  detailsSuccess,
  getFailedTwo,
  getSubjectsSuccess,
  getSubDetailsSuccess,
  getSubDetailsRequest,
} from "./sclassSlice";

//const REACT_APP_BASE_URL="http://localhost:5000"

export const getAllSclasses = (id, address) => async (dispatch) => {
  dispatch(getRequest()); // Dispatch getRequest to indicate the start of the request

  // Try to make an asynchronous GET request to the specified URL
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/${address}List/${id}`
    );
    // Check if the response contains a message indicating an error
    if (result.data.message) {
      dispatch(getFailedTwo(result.data.message)); // Dispatch getFailedTwo with the error message
    } else {
      // Dispatch getSuccess with the retrieved data
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

// Async action to fetch students of a specific class
export const getClassStudents = (id) => async (dispatch) => {
  dispatch(getRequest());  // Dispatch getRequest to indicate the start of the request

  // Try to make an asynchronous GET request to the specified URL
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/Sclass/Students/${id}`
    );
    // Check if the response contains a message indicating an error
    if (result.data.message) {
      dispatch(getFailedTwo(result.data.message));
    } else {
      dispatch(getStudentsSuccess(result.data)); // Dispatch getStudentsSuccess with the retrieved data
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

// Async action to fetch details of a specific class
export const getClassDetails = (id, address) => async (dispatch) => {
  // Dispatch getRequest to indicate the start of the request
  dispatch(getRequest());

  // Try to make an asynchronous GET request to the specified URL
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/${address}/${id}`
    );
    // Dispatch detailsSuccess with the retrieved data
    if (result.data) {
      dispatch(detailsSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

// Async action to fetch the list of subjects
export const getSubjectList = (id, address) => async (dispatch) => {
  // Dispatch getRequest to indicate the start of the request
  dispatch(getRequest());

  // Try to make an asynchronous GET request to the specified URL
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/${address}/${id}`
    );
    // Check if the response contains a message indicating an error
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSubjectsSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

// Async action to fetch the list of free subjects for a teacher
export const getTeacherFreeClassSubjects = (id) => async (dispatch) => {
  // Dispatch getRequest to indicate the start of the request
  dispatch(getRequest());

  // Try to make an asynchronous GET request to the specified URL
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/FreeSubjectList/${id}`
    );
    // Check if the response contains a message indicating an error
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSubjectsSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

// Async action to fetch details of a specific subject
export const getSubjectDetails = (id, address) => async (dispatch) => {
  // Dispatch getSubDetailsRequest to indicate the start of the request
  dispatch(getSubDetailsRequest());

  // Try to make an asynchronous GET request to the specified URL
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/${address}/${id}`
    );
    // Dispatch getSubDetailsSuccess with the retrieved data
    if (result.data) {
      dispatch(getSubDetailsSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  } 
};
