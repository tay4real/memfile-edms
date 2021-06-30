import { fetchBackend } from "./index";
import {
  getAllMDAS,
  getAllMDAFail,
  getMDA,
  getMDAFail,
} from "../actions/operations";
import {
  setMessage,
  clearMessage,
  setErrMessage,
  clearErrMessage,
} from "../actions/message";

export function fetchAllMDAs() {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());

      const res = await fetchBackend.get("/mdas");
      dispatch(getAllMDAS(res.data));
    } catch (error) {
      dispatch(getAllMDAFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function fetchMDAById(id) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.get(`/mdas/${id}`);
      dispatch(getMDA(res.data));
    } catch (error) {
      dispatch(getMDAFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function searchMDAByName(name) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());

      const res = await fetchBackend.get(`/mdas?name=${name}`);
      dispatch(getMDA(res.data));
    } catch (error) {
      dispatch(getMDAFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function createMDA(data) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      dispatch(clearMessage());
      console.log(data);
      const res = await fetchBackend.post("/mdas", data);
      console.log(res);
      if (res.data) {
        dispatch(setMessage(res.data));
        //dispatch(getMDA(res.data));
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        dispatch(clearMessage());
        dispatch(getMDAFail());
        dispatch(setErrMessage(error.response.data));
      }
    }
  };
}

export function updateMDA(id, data) {
  return async (dispatch) => {
    dispatch(clearMessage());
    dispatch(clearErrMessage());
    try {
      const res = await fetchBackend.put(`/mdas/${id}`, data);
      if (res.data) {
        dispatch(setMessage(res.data));
      }
    } catch (error) {
      dispatch(clearMessage());
      dispatch(getMDAFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function deleteMDA(id) {
  return async (dispatch) => {
    dispatch(clearErrMessage());
    try {
      const res = await fetchBackend.delete(`/mdas/${id}`);
      if (res.data) {
        dispatch(setMessage(res.data));
      }
    } catch (error) {
      dispatch(clearMessage());
      dispatch(setErrMessage(error.response.data));
    }
  };
}
