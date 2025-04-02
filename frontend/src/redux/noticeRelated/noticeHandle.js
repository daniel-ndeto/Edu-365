import axios from "axios";
import { getRequest, getSuccess, getFailed, getError } from "./noticeSlice";

//const REACT_APP_BASE_URL="http://localhost:5000"

// Async action to fetch all notices
export const getAllNotices = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    // Make an asynchronous GET request to the specified URL
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/${address}List/${id}`
    );
    // Check if the response contains a message indicating an error
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } 
    else {
      // Dispatch getSuccess with the retrieved data
      dispatch(getSuccess(result.data));
    }
  } 
  catch (error) {
    // Dispatch getError with the error object if an error occurs
    dispatch(getError(error));
  }
};
