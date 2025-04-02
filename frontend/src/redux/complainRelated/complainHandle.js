import axios from "axios";
import { getRequest, getSuccess, getFailed, getError } from "./complainSlice";

//const REACT_APP_BASE_URL="http://localhost:5000"

//const REACT_APP_BASE_URL = "https://edu-365-back.vercel.app/";

// Async action to fetch all complains
export const getAllComplains = (id, address) => async (dispatch) => {
  // Dispatch getRequest to indicate the start of the request
  dispatch(getRequest());

  try {
    // Make an asynchronous GET request to the specified URL
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/${address}List/${id}`
    );
    
    if (result.data.message) {
      // Dispatch getFailed with the error message
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
