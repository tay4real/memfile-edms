import { fetchBackend } from "./index";
import {
  getGeneralFileStart,
  getGeneralFileSuccess,
  getGeneralFileFailure,
  getGeneralFilesStart,
  getGeneralFilesSuccess,
  getGeneralFilesFailure,
  createGeneralFileStart,
  createGeneralFileSuccess,
  createGeneralFileFailure,
  updateGeneralFileStart,
  updateGeneralFileSuccess,
  updateGeneralFileFailure,
  deleteGeneralFileStart,
  deleteGeneralFileSuccess,
  deleteGeneralFileFailure,
  addDocumentToFileStart,
  addDocumentToFileSuccess,
  addDocumentToFileFailure,
  removeDocumentFromFileStart,
  removeDocumenFromFileSuccess,
  removeDocumentFromFileFailure,
  moveFileStart,
  moveFileSuccess,
  moveFileFailure,
} from "../actions/generalFile";
import { getGeneralFilesFail } from "../actions/operations";

export function fetchGeneralFiles() {
  return async (dispatch) => {
    dispatch(getGeneralFilesStart());
    try {
      const res = await fetchBackend.get("/general-files");
      dispatch(getGeneralFilesSuccess(res.data));
    } catch (error) {
      dispatch(getGeneralFilesFail());
    }
  };
}

export function fetchGeneralFilesByMDA(mdaShortName) {
  return async (dispatch) => {
    dispatch(getGeneralFilesStart());
    try {
      const res = await fetchBackend.get(
        `/general-files?mdaShortName=${mdaShortName}`
      );
      dispatch(getGeneralFilesSuccess(res.data));
    } catch (error) {
      dispatch(getGeneralFilesFailure());
    }
  };
}

export function fetchGeneralFileById(id) {
  return async (dispatch) => {
    dispatch(getGeneralFileStart());
    try {
      const res = await fetchBackend.get(`/general-files/${id}`);
      dispatch(getGeneralFileSuccess(res.data));
    } catch (error) {
      dispatch(getGeneralFileFailure());
    }
  };
}

export function addNewFile(data) {
  return async (dispatch) => {
    dispatch(createGeneralFileStart());
    try {
      const res = await fetchBackend.post("/general-files/newfile", data);
      if (res.data) {
        dispatch(createGeneralFileSuccess(res.data));
      }
    } catch (error) {
      dispatch(createGeneralFileFailure());
    }
  };
}

export function updateFile(fileId, data) {
  return async (dispatch) => {
    dispatch(updateGeneralFileStart());

    try {
      const res = await fetchBackend.put(`/general-files/${fileId}`, data);
      if (res.data) {
        dispatch(updateGeneralFileSuccess(res.data));
      }
    } catch (error) {
      dispatch(updateGeneralFileFailure());
    }
  };
}

export function addIncomingMailToFile(fileId, mailId) {
  return async (dispatch) => {
    dispatch(addDocumentToFileStart());
    try {
      const res = await fetchBackend.put(
        `/general-files/${fileId}/fileup-incoming/${mailId}`
      );
      if (res.data) {
        dispatch(addDocumentToFileSuccess(res.data));
      }
    } catch (error) {
      dispatch(addDocumentToFileFailure());
    }
  };
}

export function addOutgoingMailToFile(fileId, mailId) {
  return async (dispatch) => {
    dispatch(addDocumentToFileStart());
    try {
      const res = await fetchBackend.put(
        `/general-files/${fileId}/fileup-outgoing/${mailId}`
      );
      if (res.data) {
        dispatch(addDocumentToFileSuccess(res.data));
      }
    } catch (error) {
      dispatch(addDocumentToFileFailure());
    }
  };
}

export function removeMailFromFile(fileId, mailId) {
  return async (dispatch) => {
    dispatch(removeDocumentFromFileStart());
    try {
      const res = await fetchBackend.delete(
        `/general-files/${fileId}/remove/${mailId}`
      );
      if (res.data) {
        dispatch(removeDocumenFromFileSuccess(res.data));
      }
    } catch (error) {
      dispatch(removeDocumentFromFileFailure());
    }
  };
}

export function requestFile(user_id, file_id) {
  return async (dispatch) => {
    dispatch(moveFileStart());
    try {
      const res = await fetchBackend.put(
        `/general-filemovement/${user_id}/requestfile/${file_id}`
      );
      if (res.data) {
        dispatch(moveFileSuccess(res.data));
      }
    } catch (error) {
      dispatch(moveFileFailure(error.response.data));
    }
  };
}

export function chargeFile(user_id, file_id, charge) {
  return async (dispatch) => {
    dispatch(moveFileStart());
    try {
      const res = await fetchBackend.put(
        `/general-filemovement/${user_id}/moveFile/${file_id}`,
        charge
      );
      if (res.data) {
        dispatch(moveFileSuccess(res.data));
      }
    } catch (error) {
      dispatch(moveFileFailure(error.response.data));
    }
  };
}

export function returnFile(user_id, file_id) {
  return async (dispatch) => {
    dispatch(moveFileStart());
    try {
      const res = await fetchBackend.put(
        `/general-filemovement/${user_id}/returnFile/${file_id}`
      );
      if (res.data) {
        dispatch(moveFileSuccess(res.data));
      }
    } catch (error) {
      dispatch(moveFileFailure(error.response.data));
    }
  };
}

export function trashFile(fileId) {
  return async (dispatch) => {
    dispatch(moveFileStart());

    try {
      const res = await fetchBackend.delete(`/general-files/trash/${fileId}`);
      if (res.data) {
        dispatch(moveFileSuccess(res.data));
      }
    } catch (error) {
      dispatch(moveFileSuccess(error.response.data));
    }
  };
}

export function restoreFile(fileId) {
  return async (dispatch) => {
    dispatch(moveFileStart());

    try {
      const res = await fetchBackend.delete(`/general-files/restore/${fileId}`);
      if (res.data) {
        dispatch(moveFileSuccess(res.data));
      }
    } catch (error) {
      dispatch(moveFileFailure(error.response.data));
    }
  };
}

export function deleteFile(fileId) {
  return async (dispatch) => {
    dispatch(deleteGeneralFileStart());

    try {
      const res = await fetchBackend.delete(`/general-files/delete/${fileId}`);
      if (res.data) {
        dispatch(deleteGeneralFileSuccess(res.data));
      }
    } catch (error) {
      dispatch(deleteGeneralFileFailure(error.response.data));
    }
  };
}
