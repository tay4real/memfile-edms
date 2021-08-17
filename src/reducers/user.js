import { operations as c } from "./constants";

const initialState = {
  users: [],
  user_profile: {},
  loading: false,
};

export default function users(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_USERS_START":
      return { ...state, users: payload, loading: false };

    case c.GET_ALL_USERS:
      return { ...state, users: payload, loading: false };

    case c.GET_USERS_FAIL:
      return { ...state, users: [], loading: true };

    case c.GET_USER_PROFILE:
      return { ...state, user_profile: payload, loading: false };

    case c.GET_USER_PROFILE_FAIL:
      return { ...state, user_profile: null, loading: true };

    case c.GET_USER_BY_ID:
      return { ...state, user_profile: payload, loading: false };

    case c.GET_USER_BY_ID_FAIL:
      return { ...state, user_profile: null, loading: true };

    default:
      return state;
  }
}
