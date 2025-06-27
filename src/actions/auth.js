import * as api from "../api";
import { AUTH } from "../constants/actionTypes.js";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    // log in the user
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
    return error.response?.data;
  }
};
