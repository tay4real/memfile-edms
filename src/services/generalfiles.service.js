import { fetchBackend } from "./index";
import {
  getFile,
  getGeneralFiles,
  getGeneralFilesFail,
  getFileFail,
} from "../actions/operations";
import {
  setMessage,
  clearMessage,
  setErrMessage,
  clearErrMessage,
} from "../actions/message";

export function fetchGeneralFiles() {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.get("/general-files");
      dispatch(getGeneralFiles(res.data));
    } catch (error) {
      dispatch(getGeneralFilesFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function fetchGeneralFilesByMDA(mdaShortName) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.get(
        `/general-files?mdaShortName=${mdaShortName}`
      );
      dispatch(getGeneralFiles(res.data));
    } catch (error) {
      dispatch(getGeneralFilesFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function fetchGeneralFileById(id) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.get(`/general-files/${id}`);
      dispatch(getFile(res.data));
    } catch (error) {
      dispatch(getFileFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function addNewFile(data) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      dispatch(clearMessage());
      const res = await fetchBackend.post("/general-files/newfile", data);
      if (res.data) {
        dispatch(setMessage(res.data));
      }
    } catch (error) {
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function updateFile(fileId, data) {
  return async (dispatch) => {
    dispatch(clearErrMessage());
    dispatch(clearMessage());
    try {
      const res = await fetchBackend.put(`/general-files/${fileId}`, data);
      if (res.data) {
        dispatch(setMessage(res.data));
      }
    } catch (error) {
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function addIncomingMailToFile(fileId, mailId) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      dispatch(clearMessage());
      const res = await fetchBackend.put(
        `/general-files/${fileId}/fileup-incoming/${mailId}`
      );
      if (res.data) {
        dispatch(setMessage(res.data));
      }
    } catch (error) {
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function addOutgoingMailToFile(fileId, mailId) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      dispatch(clearMessage());
      const res = await fetchBackend.put(
        `/general-files/${fileId}/fileup-outgoing/${mailId}`
      );
      if (res.data) {
        dispatch(setMessage(res.data));
      }
    } catch (error) {
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function removeMailFromFile(fileId, mailId) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      dispatch(clearMessage());
      const res = await fetchBackend.delete(
        `/general-files/${fileId}/remove/${mailId}`
      );
      if (res.data) {
        dispatch(setMessage(res.data));
      }
    } catch (error) {
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function requestFile(user_id, file_id) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      dispatch(clearMessage());
      const res = await fetchBackend.put(
        `/general-filemovement/${user_id}/requestfile/${file_id}`
      );
      if (res.data) {
        dispatch(setMessage(res.data));
      }
    } catch (error) {
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function chargeFile(user_id, file_id, charge) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      dispatch(clearMessage());
      const res = await fetchBackend.put(
        `/general-filemovement/${user_id}/moveFile/${file_id}`,
        charge
      );
      if (res.data) {
        dispatch(setMessage(res.data));
      }
    } catch (error) {
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function returnFile(user_id, file_id) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      dispatch(clearMessage);
      const res = await fetchBackend.put(
        `/general-filemovement/${user_id}/returnFile/${file_id}`
      );
      if (res.data) {
        dispatch(setMessage(res.data));
      }
    } catch (error) {
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function trashFile(fileId) {
  return async (dispatch) => {
    dispatch(clearErrMessage());
    dispatch(clearMessage());
    try {
      const res = await fetchBackend.delete(`/general-files/trash/${fileId}`);
      if (res.data) {
        dispatch(setMessage(res.data));
      }
    } catch (error) {
      dispatch(setMessage(error.response.data));
    }
  };
}

export function restoreFile(fileId) {
  return async (dispatch) => {
    dispatch(clearMessage());
    dispatch(clearErrMessage());
    try {
      const res = await fetchBackend.delete(`/general-files/restore/${fileId}`);
      if (res.data) {
        dispatch(setMessage(res.data));
      }
    } catch (error) {
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function deleteFile(fileId) {
  return async (dispatch) => {
    dispatch(clearMessage());
    dispatch(clearErrMessage());
    try {
      const res = await fetchBackend.delete(`/general-files/delete/${fileId}`);
      if (res.data) {
        dispatch(setMessage(res.data));
      }
    } catch (error) {
      dispatch(setErrMessage(error.response.data));
    }
  };
}
