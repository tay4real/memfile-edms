import { messages as c } from "./constants";

export function setMessage(message) {
  return (dispatch) => {
    dispatch({
      type: c.SET_MESSAGE,
      payload: message,
    });
  };
}

export function clearMessage(message) {
  return (dispatch) => {
    dispatch({
      type: c.CLEAR_MESSAGE,
    });
  };
}

export function setErrMessage(message) {
  return (dispatch) => {
    dispatch({
      type: c.SET_ERR_MESSAGE,
      payload: message,
    });
  };
}

export function clearErrMessage(message) {
  return (dispatch) => {
    dispatch({
      type: c.CLEAR_ERR_MESSAGE,
    });
  };
}
