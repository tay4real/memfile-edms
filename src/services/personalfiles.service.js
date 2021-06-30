import { fetchBackend } from "./index";
import {
  getFile,
  getAllFiles,
  getPersonalFiles,
  getGeneralFiles,
  getGeneralFilesFail,
  getPersonalFilesFail,
  getAllFilesFail,
  getFileFail,
} from "../actions/operations";
import {
  setMessage,
  clearMessage,
  setErrMessage,
  clearErrMessage,
} from "../actions/message";

export function fetchAllFiles() {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.get("/files");
      dispatch(getAllFiles(res.data));
    } catch (error) {
      dispatch(getAllFilesFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function fetchMDAFiles(mdaShortName) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.get(`/files?mdaShortName=${mdaShortName}`);
      dispatch(getFile(res.data));
    } catch (error) {
      dispatch(getFileFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function fetchPersonalFiles(mdaShortName) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.get(
        `/files/personalfiles?mdaShortName=${mdaShortName}`
      );
      dispatch(getPersonalFiles(res.data));
    } catch (error) {
      dispatch(getPersonalFilesFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function fetchGeneralFiles(mdaShortName) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.get(
        `/files/generalfiles?mdaShortName=${mdaShortName}`
      );
      dispatch(getGeneralFiles(res.data));
    } catch (error) {
      dispatch(getGeneralFilesFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function fetchFileById(id) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.get(`/files/${id}`);
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
      const res = await fetchBackend.post("/files/newfile", data);
      if (res.data) {
        dispatch(getFile(res.data));
      }
    } catch (error) {
      dispatch(getFileFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function updateFile(fileId, data) {
  return async (dispatch) => {
    dispatch(clearErrMessage());
    try {
      const res = await fetchBackend.put(`/files/${fileId}`, data);
      if (res.data) {
        dispatch(getGeneralFiles(res.data));
      }
    } catch (error) {
      dispatch(getGeneralFilesFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function addMailToFile(fileId, mailId) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.put(`/files/${fileId}/fileup/${mailId}`);
      if (res.data) {
        dispatch(getFile(res.data));
      }
    } catch (error) {
      dispatch(getFileFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function removeMailFromFile(fileId, mailId) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.delete(
        `/files/${fileId}/remove/${mailId}`
      );
      if (res.data) {
        dispatch(getFile(res.data));
      }
    } catch (error) {
      dispatch(getFileFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function requestFile(user_id, file_id) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.put(
        `/filemovement/${user_id}/requestfile/${file_id}`
      );
      if (res.data) {
        dispatch(getFile(res.data));
      }
    } catch (error) {
      dispatch(getFileFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function chargeFile(user_id, file_id, charge) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.put(
        `/filemovement/${user_id}/requestfile/${file_id}`,
        charge
      );
      if (res.data) {
        dispatch(getFile(res.data));
      }
    } catch (error) {
      dispatch(getFileFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function returnFile(user_id, file_id) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.put(
        `/filemovement/${user_id}/returnFile/${file_id}`
      );
      if (res.data) {
        dispatch(getFile(res.data));
      }
    } catch (error) {
      dispatch(getFileFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function trashFile(fileId) {
  return async (dispatch) => {
    dispatch(clearErrMessage());
    dispatch(clearMessage());
    try {
      const res = await fetchBackend.delete(`/files/trash/${fileId}`);
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
      const res = await fetchBackend.delete(`/files/restore/${fileId}`);
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
      const res = await fetchBackend.delete(`/files/delete/${fileId}`);
      if (res.data) {
        dispatch(setMessage(res.data));
      }
    } catch (error) {
      dispatch(setErrMessage(error.response.data));
    }
  };
}
