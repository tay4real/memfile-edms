import { operations as c } from "./constants";

export const getMDAStart = () => ({
  type: c.GET_MDA_START,
});

export const getMDASuccess = (mda) => ({
  type: c.GET_MDA_SUCCESS,
  payload: mda,
});

export const getMDAFailure = () => ({
  type: c.GET_MDA_FAIL,
});

export const getMDAsStart = () => ({
  type: c.GET_MDAS_START,
});

export const getMDAsSuccess = (mdas) => ({
  type: c.GET_MDAS_SUCCESS,
  payload: mdas,
});

export const getMDAsFailure = () => ({
  type: c.GET_MDAS_FAIL,
});

export const createMDAStart = () => ({
  type: c.CREATE_MDA_START,
});

export const createMDASuccess = (mda) => ({
  type: c.CREATE_MDA_SUCCESS,
  payload: mda,
});

export const createMDAFailure = () => ({
  type: c.CREATE_MDA_FAIL,
});

export const updateMDAStart = () => ({
  type: c.UPDATE_MDA_START,
});

export const updateMDASuccess = (mda) => ({
  type: c.UPDATE_MDA_SUCCESS,
  payload: mda,
});

export const updateMDAFailure = () => ({
  type: c.UPDATE_MDA_FAIL,
});

export const deleteMDAStart = () => ({
  type: c.DELETE_MDA_START,
});

export const deleteMDASuccess = (mda) => ({
  type: c.DELETE_MDA_SUCCESS,
  payload: mda,
});

export const deleteMDAFailure = () => ({
  type: c.DELETE_MDA_FAIL,
});
