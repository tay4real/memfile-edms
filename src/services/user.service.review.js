import { fetchBackend } from "./index";
import {
  getUserStart,
  getUserFailure,
  getUserSuccess,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  createUserStart,
  createUserSuccess,
  createUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../actions/user";

export function addNewUser(userInfo) {
  return async (dispatch) => {
    dispatch(createUserStart);
    try {
      const res = await fetchBackend.post("/auth/register", userInfo);
      if (res.data) {
        dispatch(createUserSuccess);
      }
    } catch (error) {
      dispatch(createUserFailure());
    }
  };
}

export function fetchUserProfile() {
  return async (dispatch) => {
    try {
      dispatch(getUserStart());
      const res = await fetchBackend.get(`/users/me`);
      dispatch(getUserSuccess(res.data));
    } catch (error) {
      dispatch(getUserFailure());
    }
  };
}

export function updateUserProfile(data) {
  return async (dispatch) => {
    try {
      dispatch(updateUserStart());

      const res = await fetchBackend.put("/users/me", data);
      if (res.data) {
        dispatch(getUserSuccess(res.data));
      }
    } catch (error) {
      if (error.response) {
        dispatch(getUserFailure());
      }
    }
  };
}

export function updateUserAvatar(data) {
  return async (dispatch) => {
    dispatch(updateUserStart());
    try {
      const res = await fetchBackend.put("users/me/avatar", data);
      if (res.data) {
        dispatch(getUserSuccess(res.data));
      }
    } catch (error) {
      if (error.response) {
        dispatch(getUserFailure());
      }
    }
  };
}

export function deleteUserAvatar(data) {
  return async (dispatch) => {
    try {
      dispatch(deleteUserStart());

      const res = await fetchBackend.delete("users/me/avatar", data);
      if (res.data) {
        dispatch(deleteUserSuccess(res.data));
      }
    } catch (error) {
      if (error.response) {
        dispatch(deleteUserFailure());
      }
    }
  };
}

export function fetchAllUsers() {
  return async (dispatch) => {
    dispatch(getUsersStart());
    try {
      const res = await fetchBackend.get("/users");
      dispatch(getUsersSuccess(res.data));
    } catch (error) {
      dispatch(getUsersFailure());
    }
  };
}

export function fetchActiveUsers() {
  return async (dispatch) => {
    dispatch(getUsersStart());
    try {
      const res = await fetchBackend.get("/users?status=0");
      dispatch(getUsersSuccess(res.data));
    } catch (error) {
      dispatch(getUsersFailure());
    }
  };
}

export function fetchInActiveUsers() {
  return async (dispatch) => {
    dispatch(getUsersStart());
    try {
      const res = await fetchBackend.get("/users?status=1");
      dispatch(getUsersSuccess(res.data));
    } catch (error) {
      dispatch(getUsersFailure());
    }
  };
}

export function fetchUserByID(id) {
  return async (dispatch) => {
    dispatch(getUserStart());
    try {
      const res = await fetchBackend.get(`/users/${id}`);
      if (res.data) {
        dispatch(getUserSuccess(res.data));
      }
    } catch (error) {
      if (error.response) {
        dispatch(getUserFailure());
      }
    }
  };
}

export function updateUserRecord(userId, userInfo) {
  return async (dispatch) => {
    dispatch(updateUserStart());
    try {
      const res = await fetchBackend.put(`/users/${userId}`, userInfo);
      dispatch(updateUserSuccess(res.data));
    } catch (error) {
      dispatch(updateUserFailure());
    }
  };
}

// export function deactivateUser(userId) {
//   return async (dispatch) => {
//     try {
//       dispatch(clearMessage());
//       dispatch(clearErrMessage());
//       const res = await fetchBackend.put(`/users/deactivate/${userId}`);
//       dispatch(setMessage(res.data));
//     } catch (error) {
//       dispatch(setErrMessage(error.response.data));
//     }
//   };
// }

// export function activateUser(userId) {
//   return async (dispatch) => {
//     try {
//       dispatch(clearMessage());
//       dispatch(clearErrMessage());
//       const res = await fetchBackend.put(`/users/activate/${userId}`);
//       dispatch(setMessage(res.data));
//     } catch (error) {
//       dispatch(setErrMessage(error.response.data));
//     }
//   };
// }

export function deleteUser(userId) {
  return async (dispatch) => {
    dispatch(deleteUserStart());
    try {
      const res = await fetchBackend.delete(`/users/${userId}`);
      dispatch(deleteUserSuccess(res.data));
    } catch (error) {
      dispatch(deleteUserFailure());
    }
  };
}
