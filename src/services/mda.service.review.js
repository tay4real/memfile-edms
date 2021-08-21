import { fetchBackend } from "./index";
import {
  getMDAStart,
  getMDASuccess,
  getMDAFailure,
  getMDAsStart,
  getMDAsSuccess,
  getMDAsFailure,
  createMDAStart,
  createMDASuccess,
  createMDAFailure,
  updateMDAStart,
  updateMDASuccess,
  updateMDAFailure,
  deleteMDAStart,
  deleteMDASuccess,
  deleteMDAFailure,
} from "../actions/mda";

export function fetchAllMDAs() {
  return async (dispatch) => {
    dispatch(getMDAsStart());
    try {
      const res = await fetchBackend.get("/mdas");
      dispatch(getMDAsSuccess(res.data));
    } catch (error) {
      dispatch(getMDAsFailure());
    }
  };
}

export function fetchMDAById(id) {
  return async (dispatch) => {
    dispatch(getMDAStart());
    try {
      const res = await fetchBackend.get(`/mdas/${id}`);
      dispatch(getMDASuccess(res.data));
    } catch (error) {
      dispatch(getMDAFailure());
    }
  };
}

export function searchMDAByName(name) {
  return async (dispatch) => {
    dispatch(getMDAStart());
    try {
      const res = await fetchBackend.get(`/mdas?name=${name}`);
      dispatch(getMDASuccess(res.data));
    } catch (error) {
      dispatch(getMDAFailure());
    }
  };
}

export function createMDA(data) {
  return async (dispatch) => {
    dispatch(createMDAStart());
    try {
      const res = await fetchBackend.post("/mdas", data);

      if (res.data) {
        dispatch(createMDASuccess(res.data));
      }
    } catch (error) {
      if (error.response) {
        dispatch(createMDAFailure());
      }
    }
  };
}

export function updateMDA(id, data) {
  return async (dispatch) => {
    dispatch(updateMDAStart());
    try {
      const res = await fetchBackend.put(`/mdas/${id}`, data);
      if (res.data) {
        dispatch(updateMDASuccess(res.data));
      }
    } catch (error) {
      dispatch(updateMDAFailure());
    }
  };
}

export function deleteMDA(id) {
  return async (dispatch) => {
    dispatch(deleteMDAStart());
    try {
      const res = await fetchBackend.delete(`/mdas/${id}`);
      if (res.data) {
        dispatch(deleteMDASuccess(res.data));
      }
    } catch (error) {
      dispatch(deleteMDAFailure());
    }
  };
}
