import axios from "axios";
import { getRequest, getSuccess, getFailed, getError } from "./complainSlice";

//const REACT_APP_BASE_URL="http://localhost:5000"

//const REACT_APP_BASE_URL = "https://campus-connect-backend-sa.vercel.app/";
export const getAllComplains = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/${address}List/${id}`
    );
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
    //
  }
};
