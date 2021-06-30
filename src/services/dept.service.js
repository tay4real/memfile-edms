import { fetchBackend } from "./index";
import {
  getAllDepts,
  getAllDeptsFail,
  getDept,
  getDeptFail,
} from "../actions/operations";
import {
  setMessage,
  clearMessage,
  setErrMessage,
  clearErrMessage,
} from "../actions/message";

export function fetchAllDepts(id) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());

      const res = await fetchBackend.get(`/mdas/${id}/departments`);
      dispatch(getAllDepts(res.data));
    } catch (error) {
      dispatch(getAllDeptsFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function fetchDept(mdaID, deptID) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());

      const res = await fetchBackend.get(
        `/mdas/${mdaID}/departments/${deptID}`
      );
      dispatch(getDept(res.data));
    } catch (error) {
      dispatch(getDeptFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function createDept(id, data) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      dispatch(clearMessage());
      const res = await fetchBackend.post(`/mdas/${id}/departments/`, data);
      console.log(res);
      if (res.data) {
        dispatch(setMessage(res.data));
        // dispatch(getDept(res.data));
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        dispatch(clearMessage());
        dispatch(getDeptFail());
        dispatch(setErrMessage(error.response.data));
      }
    }
  };
}

export function updateDept(id, deptID, data) {
  return async (dispatch) => {
    dispatch(clearErrMessage());
    dispatch(clearMessage());
    try {
      const res = await fetchBackend.put(
        `/mdas/${id}/departments/${deptID}`,
        data
      );
      if (res.data) {
        dispatch(setMessage(res.data));
        dispatch(getDept(res.data));
      }
    } catch (error) {
      dispatch(clearMessage());
      dispatch(getDeptFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function deleteDept(id, deptID) {
  return async (dispatch) => {
    dispatch(clearErrMessage());
    try {
      const res = await fetchBackend.delete(
        `/mdas/${id}/departments/${deptID}`
      );
      if (res.data) {
        dispatch(setMessage(res.data));
      }
    } catch (error) {
      dispatch(clearMessage());
      dispatch(setErrMessage(error.response.data));
    }
  };
}
