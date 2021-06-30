import { fetchBackend } from "./index";
import { userLoginSuccess, userLoginFail, userLogOut } from "../actions/auth";
import { setMessage, clearMessage } from "../actions/message";

export function fetchUser() {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      const res = await fetchBackend.get("/users/me");
      if (res.statusText === "OK") {
        dispatch(userLoginSuccess(res.data));
      }
    } catch (error) {
      if (error.response) {
        dispatch(userLoginFail());
        dispatch(setMessage(error.response.data));
      }
    }
  };
}

export function logout() {
  return async (dispatch) => {
    localStorage.removeItem("accessToken");
    dispatch(userLogOut());
    window.location.replace("/");
  };
}
