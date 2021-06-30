import { auth as c } from "../actions/constants";

const initialState = { user: null };

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case c.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };

    case c.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    case c.LOGOUT:
      return {
        ...state,
        isLoggedIn: true,
        user: null,
      };

    default:
      return state;
  }
}
