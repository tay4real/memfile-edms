import { fetchBackend } from "./index";
import {
  getMailsFail,
  getMailsSucess,
  getMail,
  getMailFail,
} from "../actions/operations";
import {
  setMessage,
  clearMessage,
  setErrMessage,
  clearErrMessage,
} from "../actions/message";

export function fetchIncomingMails() {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.get("/incoming-mails");
      dispatch(getMailsSucess(res.data));
    } catch (error) {
      dispatch(getMailsFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function searchIncomingMails(query) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.get(`/incoimng-mails?${query}`);
      dispatch(getMailsSucess(res.data));
    } catch (error) {
      dispatch(getMailsFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function fetchIncomingMailByID(mailID) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      const res = await fetchBackend.get(`/incoming-mails/${mailID}`);
      dispatch(getMail(res.data));
    } catch (error) {
      dispatch(getMailFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function addNewMail(mail) {
  return async (dispatch) => {
    try {
      dispatch(clearErrMessage());
      dispatch(clearMessage());
      const res = await fetchBackend.post("/incoming-mails", mail);
      dispatch(setMessage(res.data));
    } catch (error) {
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
        `/incoming-mails/${mailID}/upload`,
        file_image
      );
      dispatch(getMail(res.data));
    } catch (error) {
      dispatch(getMailFail());
      dispatch(setErrMessage(error.response.data));
    }
  };
}

export function downloadPDF(id) {
  window.location.replace(
    `${process.env.REACT_APP_API_URL}/incoming-mails/${id}/pdf`
  );
}

export function editMail(id, mail) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      dispatch(clearErrMessage());
      const res = await fetchBackend.put(`/incoming-mails/${id}`, mail);
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
      const res = await fetchBackend.put(`/incoming-mails/changestatus/${id}`);
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
      const res = await fetchBackend.delete(`/incoming-mails/${id}`);
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
      const res = await fetchBackend.put(`/incoming-mails`);
      dispatch(setMessage(res.data));
    } catch (error) {
      dispatch(setErrMessage(error.response.data));
    }
  };
}
