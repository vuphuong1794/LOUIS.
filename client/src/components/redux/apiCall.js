import { loginFailure, loginStart, loginSuccess, googleLoginSuccess } from "./userRedux";
import axios from "axios"

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("https://louis-a89w.onrender.com/api/auth/login", user, {withCredentials: true});
    dispatch(loginSuccess(res.data));

  } catch (err) {
    dispatch(loginFailure(err.response));
  }
};

export const logOut = (dispatch)=>{
  dispatch(loginFailure())
}

export const handleGoogleLogin = (googleUserData) => async (dispatch) => {
    try {
        // Xử lý dữ liệu từ Google ở đây nếu cần
        dispatch(googleLoginSuccess(googleUserData));
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};