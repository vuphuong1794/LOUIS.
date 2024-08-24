import {
  loginFailure,
  loginStart,
  loginSuccess,
  googleLoginSuccess,
} from "./userRedux";
import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://louis-a89w.onrender.com/api/auth/login",
      user,
      { withCredentials: true }
    );
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err.response));
  }
};

export const logOut = (dispatch) => {
  dispatch(loginFailure());
};

export const handleGoogleLogin = (googleUserData) => async (dispatch) => {
  try {
    // Nếu cần, bạn có thể gửi dữ liệu này đến server để xác thực hoặc lưu trữ
    // const res = await axios.post("https://louis-a89w.onrender.com/api/auth/google-login", googleUserData, {withCredentials: true});
    // dispatch(googleLoginSuccess(res.data));

    // Hoặc nếu bạn đã có đầy đủ thông tin người dùng, có thể dispatch trực tiếp
    dispatch(googleLoginSuccess(googleUserData));
  } catch (error) {
    dispatch(loginFailure(error.response || error.message));
  }
};
