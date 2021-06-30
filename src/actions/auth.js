import { auth as c } from "./constants";

export function userLoginSuccess(user) {
  return (dispatch) => {
    dispatch({
      type: c.LOGIN_SUCCESS,
      payload: user,
    });
  };
}

export function userLoginFail(error) {
  return (dispatch) => {
    dispatch({
      type: c.LOGIN_FAIL,
    });
  };
}

export function userLogOut() {
  return (dispatch) => {
    dispatch({
      type: c.LOGOUT,
    });
  };
}
