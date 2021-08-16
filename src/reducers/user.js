import { operations as c } from "./constants";

export const getUserStart = () => ({
  type: c.GET_USER_START,
});

export const getUserSuccess = (user) => ({
  type: c.GET_USER_SUCCESS,
  payload: user,
});

export const getUserFailure = () => ({
  type: c.GET_USER_FAIL,
});

export const getUsersStart = () => ({
  type: c.GET_USERS_START,
});

export const getUsersSuccess = (users) => ({
  type: c.GET_USERS_SUCCESS,
  payload: users,
});

export const getUsersFailure = () => ({
  type: c.GET_USERS_FAIL,
});

export const createUserStart = () => ({
  type: c.CREATE_USER_START,
});

export const createUserSuccess = (user) => ({
  type: c.CREATE_USER_SUCCESS,
  payload: user,
});

export const createUserFailure = () => ({
  type: c.CREATE_USER_FAIL,
});

export const updateUserStart = () => ({
  type: c.UPDATE_USER_START,
});

export const updateUserSuccess = (user) => ({
  type: c.UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserFailure = () => ({
  type: c.UPDATE_USER_FAIL,
});

export const deleteUserStart = () => ({
  type: c.DELETE_USER_START,
});

export const deleteUserSuccess = (user) => ({
  type: c.DELETE_USER_SUCCESS,
  payload: user,
});

export const deleteUserFailure = () => ({
  type: c.DELETE_USER_FAIL,
});
