import { operations as c } from "./constants";

export const getGeneralFileStart = () => ({
  type: c.GET_GENERAL_FILE_START,
});

export const getGeneralFileSuccess = (file) => ({
  type: c.GET_GENERAL_FILE_SUCCESS,
  payload: file,
});

export const getGeneralFileFailure = () => ({
  type: c.GET_GENERAL_FILE_FAIL,
});

export const getGeneralFilesStart = () => ({
  type: c.GET_GENERAL_FILES_START,
});

export const getGeneralFilesSuccess = (files) => ({
  type: c.GET_GENERAL_FILES_SUCCESS,
  payload: files,
});

export const getGeneralFilesFailure = () => ({
  type: c.GET_GENERAL_FILES_FAIL,
});

export const createGeneralFileStart = () => ({
  type: c.CREATE_GENERAL_FILE_START,
});

export const createGeneralFileSuccess = (file) => ({
  type: c.CREATE_GENERAL_FILE_SUCCESS,
  payload: file,
});

export const createGeneralFileFailure = () => ({
  type: c.CREATE_GENERAL_FILE_FAIL,
});

export const updateGeneralFileStart = () => ({
  type: c.UPDATE_GENERAL_FILE_START,
});

export const updateGeneralFileSuccess = (file) => ({
  type: c.UPDATE_GENERAL_FILE_SUCCESS,
  payload: file,
});

export const updateGeneralFileFailure = () => ({
  type: c.UPDATE_GENERAL_FILE_FAIL,
});

export const deleteGeneralFileStart = () => ({
  type: c.DELETE_GENERAL_FILE_START,
});

export const deleteGeneralFileSuccess = (file) => ({
  type: c.DELETE_GENERAL_FILE_SUCCESS,
  payload: file,
});

export const deleteGeneralFileFailure = () => ({
  type: c.DELETE_GENERAL_FILE_FAIL,
});

export const addDocumentToFileStart = () => ({
  type: c.ADD_DOCUMENT_TO_FILE_START,
});

export const addDocumentToFileSuccess = (message) => ({
  type: c.ADD_DOCUMENT_TO_FILE_SUCCESS,
  payload: message,
});

export const addDocumentToFileFailure = () => ({
  type: c.ADD_DOCUMENT_TO_FILE_FAIL,
});

export const removeDocumentFromFileStart = () => ({
  type: c.REMOVE_DOCUMENT_FROM_FILE_START,
});

export const removeDocumenFromFileSuccess = (message) => ({
  type: c.REMOVE_DOCUMENT_FROM_FILE_SUCCESS,
  payload: message,
});

export const removeDocumentFromFileFailure = () => ({
  type: c.REMOVE_DOCUMENT_FROM_FILE_FAIL,
});

export const moveFileStart = () => ({
  type: c.REQUEST_FILE_START,
});

export const moveFileSuccess = (message) => ({
  type: c.REQUEST_FILE_SUCCESS,
  payload: message,
});

export const moveFileFailure = (error) => ({
  type: c.REQUEST_FILE_FAIL,
  payload: error,
});
