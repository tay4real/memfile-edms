import { fetchBackend } from "./index";
import {
  getOutgoingMailsFail,
  getOutgoingMailsSuccess,
  getOutgoingMail,
  getOutgoingMailFail,
} from "../actions/operations";
import {
  setMessage,
  clearMessage,
  setErrMessage,
  clearErrMessage,
} from "../actions/message";

export function fetchAllOutgoingMails() {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.get("/outgoing-mails");
      dispatch(getOutgoingMailsSuccess(res.data));
    } catch (error) {
      dispatch(getOutgoingMailsFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function searchOutgoingMails(query) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.get(`/outgoing-mails?${query}`);
      dispatch(getOutgoingMailsSuccess(res.data));
    } catch (error) {
      dispatch(getOutgoingMailsFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function fetchOutgoingMailByID(mailID) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.get(`/outgoing-mails/${mailID}`);
      dispatch(getOutgoingMail(res.data));
    } catch (error) {
      dispatch(getOutgoingMailFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function addNewMail(mail) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      dispatch(clearMessage());
      const res = await fetchBackend.post("/outgoing-mails", mail);
      dispatch(getOutgoingMail(res.data));
    } catch (error) {
      dispatch(getOutgoingMailFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function uploadMailScan(mailID, file_image) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      dispatch(setMessage(null));
      const res = await fetchBackend.post(
        `/outgoing-mails/${mailID}/upload`,
        file_image
      );
      dispatch(setMessage(res.data));
    } catch (error) {
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function downloadPDF(id) {
  window.location.replace(
    `${process.env.REACT_APP_API_URL}/outgoing-mails/${id}/pdf`
  );
}

export function editMail(id, mail) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      dispatch(clearErrMessage());
      const res = await fetchBackend.put(`/outgoing-mails/${id}`, mail);
      dispatch(setMessage(res.data));
    } catch (error) {
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function changeMailStatus(id) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      dispatch(clearErrMessage());
      const res = await fetchBackend.put(`/outgoing-mails/changestatus/${id}`);
      dispatch(setMessage(res.data));
    } catch (error) {
      dispatch(clearMessage());
    }
  };
}

export function deleteMail(id) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      dispatch(clearErrMessage());
      const res = await fetchBackend.delete(`/outgoing-mails/${id}`);
      dispatch(setMessage(res.data));
    } catch (error) {
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function deleteAllMails() {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      dispatch(clearErrMessage());
      const res = await fetchBackend.put(`/outgoing-mails-mails`);
      dispatch(setMessage(res.data));
    } catch (error) {
      dispatch(setErrMessage(error.response.data));
    }
  };
}
