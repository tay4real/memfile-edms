import { fetchBackend } from "../../services";
import { loginFailure, loginStart, loginSuccess } from "./AuthAction";

export const login = async (user, dispatch) => {
  dispatch(loginStart());

  try {
    const res = await fetchBackend.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
