import { fetchBackend } from "./index";
import { getMailsFail, getMailsSucess } from "../redux/actions/operations";
import { setMessage, clearMessage } from "../redux/actions/message";

export function fetchMails() {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      const res = await fetchBackend.get("/mails");
      dispatch(getMailsSucess(res.data));
    } catch (error) {
      dispatch(getMailsFail());
      dispatch(setMessage(error.data.message));
    }
  };
}

export function searchAllMails(query) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      const res = await fetchBackend.get(`/mails?${query}`);
      dispatch(getMailsSucess(res.data));
    } catch (error) {
      dispatch(getMailsFail());
      dispatch(setMessage(error));
    }
  };
}

export function fetchIncomingMails() {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      const res = await fetchBackend.get("/mails/incoming");
      dispatch(getMailsSucess(res.data));
    } catch (error) {
      dispatch(getMailsFail());
      dispatch(setMessage(error));
    }
  };
}

export function searchIncomingMails(query) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      const res = await fetchBackend.get(`/mails/incoming?${query}`);
      dispatch(getMailsSucess(res.data));
    } catch (error) {
      dispatch(getMailsFail());
      dispatch(setMessage(error));
    }
  };
}

export function fetchOutgoingMails() {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      const res = await fetchBackend.get("/mails/outgoing");
      dispatch(getMailsSucess(res.data));
    } catch (error) {
      dispatch(getMailsFail());
      dispatch(setMessage(error));
    }
  };
}

export function searchOutgoingMails(query) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      const res = await fetchBackend.get(`/mails/outgoing?${query}`);
      dispatch(getMailsSucess(res.data));
    } catch (error) {
      dispatch(getMailsFail());
      dispatch(setMessage(error));
    }
  };
}

export function fetchTrashedMails() {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      const res = await fetchBackend.get("/mails/trash");
      dispatch(getMailsSucess(res.data));
    } catch (error) {
      dispatch(getMailsFail());
      dispatch(setMessage(error));
    }
  };
}

export function fetchMailByID(mailID) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      const res = await fetchBackend.get(`/mails/${mailID}`);
      dispatch(getMailsSucess(res.data));
    } catch (error) {
      dispatch(getMailsFail());
      dispatch(setMessage(error));
    }
  };
}

export function addNewMail(mail) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      const res = await fetchBackend.get("/mails/add_mail", mail);
      dispatch(getMailsSucess(res.data));
    } catch (error) {
      dispatch(getMailsFail());
      dispatch(clearMessage());
    }
  };
}

export function uploadMailScan(mailID, file_image) {
  dispatch(setMessage(null));
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      const res = await fetchBackend.get(`/mails/${mailID}/upload`, file_image);
      dispatch(getMailsSucess(res.data));
    } catch (error) {
      dispatch(getMailsFail());
      dispatch(clearMessage());
    }
  };
}

export function downloadPDF(id) {
  window.location.replace(`${process.env.REACT_APP_API_URL}/memo/${id}/pdf`);
}

export function editMail(id, mail) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      const res = await fetchBackend.put(`/mails/${id}`, mail);
      dispatch(getMailsSucess(res.data));
    } catch (error) {
      dispatch(getMailsFail());
      dispatch(clearMessage());
    }
  };
}

export function trashMail(id) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      const res = await fetchBackend.put(`/mails/trash/${id}`);
      dispatch(getMailsSucess(res.data));
    } catch (error) {
      dispatch(getMailsFail());
      dispatch(clearMessage());
    }
  };
}

export function restoreMail(id) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      const res = await fetchBackend.put(`/mails/trash/restore/${id}`);
      dispatch(getMailsSucess(res.data));
    } catch (error) {
      dispatch(getMailsFail());
      dispatch(clearMessage());
    }
  };
}

export function deleteMail(id) {
  return async (dispatch) => {
    try {
      dispatch(clearMessage());
      const res = await fetchBackend.put(`mails/trash/delete/:id/${id}`);
      dispatch(getMailsSucess(res.data));
    } catch (error) {
      dispatch(getMailsFail());
      dispatch(clearMessage());
    }
  };
}
