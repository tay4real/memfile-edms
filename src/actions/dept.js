import { operations as c } from "./constants";

export const getDepartmentStart = () => ({
  type: c.GET_DEPT_START,
});

export const getDepartmentSuccess = (dept) => ({
  type: c.GET_DEPT_SUCCESS,
  payload: dept,
});

export const getDepartmentFailure = () => ({
  type: c.GET_DEPT_FAIL,
});

export const getDepartmentsStart = () => ({
  type: c.GET_DEPTS_START,
});

export const getDepartmentsSuccess = (depts) => ({
  type: c.GET_DEPTS_SUCCESS,
  payload: depts,
});

export const getDepartmentsFailure = () => ({
  type: c.GET_DEPTS_FAIL,
});

export const createDepartmentStart = () => ({
  type: c.CREATE_DEPT_START,
});

export const createDepartmentSuccess = (dept) => ({
  type: c.CREATE_DEPT_SUCCESS,
  payload: dept,
});

export const createDepartmentFailure = () => ({
  type: c.CREATE_DEPT_FAIL,
});

export const updateDepartmentStart = () => ({
  type: c.UPDATE_DEPT_START,
});

export const updateDepartmentSuccess = (dept) => ({
  type: c.UPDATE_DEPT_SUCCESS,
  payload: dept,
});

export const updateDepartmentFailure = () => ({
  type: c.UPDATE_DEPT_FAIL,
});

export const deleteDepartmentStart = () => ({
  type: c.DELETE_DEPT_START,
});

export const deleteDepartmentSuccess = (dept) => ({
  type: c.DELETE_DEPT_SUCCESS,
  payload: dept,
});

export const deleteDepartmentFailure = () => ({
  type: c.DELETE_DEPT_FAIL,
});
