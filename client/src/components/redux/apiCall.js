import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import axios from "axios"

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("https://louis-a89w.onrender.com/api/auth/login", user, {withCredentials: true});
    dispatch(loginSuccess(res.data));

  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logOut = (dispatch)=>{
  dispatch(loginFailure())
}