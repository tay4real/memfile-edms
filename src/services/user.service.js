import { fetchBackend } from "./index";
import {
  getUserProfile,
  getUserProfileFail,
  getAllUsers,
  getAllUsersFail,
} from "../actions/operations";
import {
  setMessage,
  clearMessage,
  setErrMessage,
  clearErrMessage,
} from "../actions/message";

export function addNewUser(userInfo) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      dispatch(clearErrMessage());
      const res = await fetchBackend.post("/auth/register", userInfo);
      if (res.data) {
        dispatch(getUserProfile(res.data));
      }
    } catch (error) {
      dispatch(getUserProfileFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function fetchUserProfile() {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      dispatch(clearErrMessage());
      const res = await fetchBackend.get(`/users/me`);
      dispatch(getUserProfile(res.data));
    } catch (error) {
      dispatch(getUserProfileFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function updateUserProfile(data) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      dispatch(clearErrMessage());
      const res = await fetchBackend.put("/users/me", data);
      if (res.data) {
        dispatch(getUserProfile(res.data));
      }
    } catch (error) {
      if (error.response) {
        dispatch(getUserProfile());
        dispatch(setErrMessage(error.response.data));
      }
    }
  };
}

export function updateUserAvatar(data) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      const res = await fetchBackend.put("users/me/avatar", data);
      if (res.data) {
        dispatch(getUserProfile(res.data));
      }
    } catch (error) {
      if (error.response) {
        dispatch(getUserProfile());
        dispatch(setErrMessage(error.response.data));
      }
    }
  };
}

export function deleteUserAvatar(data) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      dispatch(clearErrMessage());
      const res = await fetchBackend.delete("users/me/avatar", data);
      if (res.data) {
        dispatch(getUserProfile(res.data));
      }
    } catch (error) {
      if (error.response) {
        dispatch(getUserProfile());
        dispatch(setErrMessage(error.response.data));
      }
    }
  };
}

export function fetchAllUsers() {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      dispatch(clearErrMessage());
      const res = await fetchBackend.get("/users");
      dispatch(getAllUsers(res.data));
    } catch (error) {
      dispatch(getAllUsersFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function fetchActiveUsers() {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      dispatch(clearErrMessage());
      const res = await fetchBackend.get("/users?status=0");
      dispatch(getAllUsers(res.data));
    } catch (error) {
      dispatch(getAllUsersFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function fetchInActiveUsers() {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      dispatch(clearErrMessage());
      const res = await fetchBackend.get("/users?status=1");
      dispatch(getAllUsers(res.data));
    } catch (error) {
      dispatch(getAllUsersFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function fetchUserByID(id) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      dispatch(clearErrMessage());
      const res = await fetchBackend.get(`/users/${id}`);
      if (res.data) {
        dispatch(getUserProfile(res.data));
      }
    } catch (error) {
      if (error.response) {
        dispatch(getUserProfileFail());
        dispatch(setErrMessage(error.response.data));
      }
    }
  };
}

export function updateUserRecord(userId, userInfo) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      dispatch(clearErrMessage());

      const res = await fetchBackend.put(`/users/${userId}`, userInfo);
      dispatch(getUserProfile(res.data));
    } catch (error) {
      dispatch(getUserProfileFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function deactivateUser(userId) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      dispatch(clearErrMessage());
      const res = await fetchBackend.put(`/users/deactivate/${userId}`);
      dispatch(setMessage(res.data));
    } catch (error) {
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function activateUser(userId) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      dispatch(clearErrMessage());
      const res = await fetchBackend.put(`/users/activate/${userId}`);
      dispatch(setMessage(res.data));
    } catch (error) {
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function deleteUser(userId) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      dispatch(clearErrMessage());
      const res = await fetchBackend.delete(`/users/${userId}`);
      dispatch(setMessage(res.data));
    } catch (error) {
      dispatch(setErrMessage(error.response.data));
    }
  };
}
