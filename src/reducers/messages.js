import { messages as c } from "../actions/constants";

const initialState = { message: null, err_message: null };

export default function messages(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case c.SET_MESSAGE:
      return { message: payload };

    case c.CLEAR_MESSAGE:
      return { message: "" };

    case c.SET_ERR_MESSAGE:
      return { err_message: payload };

    case c.CLEAR_ERR_MESSAGE:
      return { err_message: "" };

    default:
      return state;
  }
}
