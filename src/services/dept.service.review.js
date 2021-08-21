import { fetchBackend } from "./index";
import {
  getDepartmentFailure,
  getDepartmentStart,
  getDepartmentSuccess,
  getDepartmentsFailure,
  getDepartmentsSuccess,
  getDepartmentsStart,
  createDepartmentStart,
  createDepartmentSuccess,
  createDepartmentFailure,
  updateDepartmentStart,
  updateDepartmentSuccess,
  updateDepartmentFailure,
  deleteDepartmentStart,
  deleteDepartmentSuccess,
  deleteDepartmentFailure,
} from "../actions/dept";

export function fetchAllDepts(id) {
  return async (dispatch) => {
    dispatch(getDepartmentsStart());
    try {
      const res = await fetchBackend.get(`/mdas/${id}/departments`);
      dispatch(getDepartmentsSuccess(res.data));
    } catch (error) {
      dispatch(getDepartmentsFailure());
    }
  };
}

export function fetchDept(mdaID, deptID) {
  return async (dispatch) => {
    dispatch(getDepartmentStart());
    try {
      const res = await fetchBackend.get(
        `/mdas/${mdaID}/departments/${deptID}`
      );
      dispatch(getDepartmentSuccess(res.data));
    } catch (error) {
      dispatch(getDepartmentFailure());
    }
  };
}

export function createDept(id, data) {
  return async (dispatch) => {
    dispatch(createDepartmentStart());
    try {
      const res = await fetchBackend.post(`/mdas/${id}/departments/`, data);
      console.log(res);
      if (res.data) {
        dispatch(createDepartmentSuccess(res.data));
      }
    } catch (error) {
      if (error.response) {
        dispatch(createDepartmentFailure());
      }
    }
  };
}

export function updateDept(id, deptID, data) {
  return async (dispatch) => {
    dispatch(updateDepartmentStart());
    try {
      const res = await fetchBackend.put(
        `/mdas/${id}/departments/${deptID}`,
        data
      );
      if (res.data) {
        dispatch(updateDepartmentSuccess());
      }
    } catch (error) {
      dispatch(updateDepartmentFailure());
    }
  };
}

export function deleteDept(id, deptID) {
  return async (dispatch) => {
    dispatch(deleteDepartmentStart());
    try {
      const res = await fetchBackend.delete(
        `/mdas/${id}/departments/${deptID}`
      );
      if (res.data) {
        dispatch(deleteDepartmentSuccess(res.data));
      }
    } catch (error) {
      dispatch(deleteDepartmentFailure());
    }
  };
}
