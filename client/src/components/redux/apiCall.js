import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import axios from "axios"

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/api/auth/login", user);
    dispatch(loginSuccess(res.data));

  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logOut = (dispatch)=>{
  dispatch(loginFailure())
}