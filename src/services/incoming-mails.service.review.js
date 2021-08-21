import { fetchBackend } from "./index";
import {
  getIncomingMailStart,
  getIncomingMailSuccess,
  getIncomingMailFailure,
  getIncomingMailsStart,
  getIncomingMailsFailure,
  getIncomingMailsSuccess,
  createIncomingMailStart,
  createIncomingMailSuccess,
  createIncomingMailFailure,
  updateIncomingMailStart,
  updateIncomingMailSuccess,
  updateIncomingMailFailure,
  deleteIncomingMailStart,
  deleteIncomingMailSuccess,
  deleteIncomingMailFailure,
} from "../actions/incomingMail";

export function fetchIncomingMails() {
  return async (dispatch) => {
    dispatch(getIncomingMailsStart());
    try {
      const res = await fetchBackend.get("/incoming-mails");
      dispatch(getIncomingMailsSuccess(res.data));
    } catch (error) {
      dispatch(getIncomingMailsFailure());
    }
  };
}

export function searchIncomingMails(query) {
  return async (dispatch) => {
    dispatch(getIncomingMailsStart());
    try {
      const res = await fetchBackend.get(`/incoming-mails?${query}`);
      dispatch(getIncomingMailsSuccess(res.data));
    } catch (error) {
      dispatch(getIncomingMailsFailure());
    }
  };
}

export function fetchIncomingMailByID(mailID) {
  return async (dispatch) => {
    dispatch(getIncomingMailStart());
    try {
      const res = await fetchBackend.get(`/incoming-mails/${mailID}`);
      dispatch(getIncomingMailSuccess(res.data));
    } catch (error) {
      dispatch(getIncomingMailFailure());
    }
  };
}

export function addNewMail(mail) {
  return async (dispatch) => {
    dispatch(createIncomingMailStart());
    try {
      const res = await fetchBackend.post("/incoming-mails", mail);
      dispatch(createIncomingMailSuccess(res.data));
    } catch (error) {
      dispatch(createIncomingMailFailure(error.response.data));
    }
  };
}

export function uploadMailScan(mailID, file_image) {
  return async (dispatch) => {
    dispatch(updateIncomingMailStart());
    try {
      const res = await fetchBackend.post(
        `/incoming-mails/${mailID}/upload`,
        file_image
      );
      dispatch(updateIncomingMailSuccess(res.data));
    } catch (error) {
      dispatch(updateIncomingMailFailure(error.response.data));
    }
  };
}

export function editMail(id, mail) {
  return async (dispatch) => {
    dispatch(updateIncomingMailStart());
    try {
      const res = await fetchBackend.put(`/incoming-mails/${id}`, mail);
      dispatch(updateIncomingMailSuccess(res.data));
    } catch (error) {
      dispatch(updateIncomingMailFailure(error.response.data));
    }
  };
}

// export function changeMailStatus(id) {
//   return async (dispatch) => {
//     try {
//       dispatch(clearMessage());
//       dispatch(clearErrMessage());
//       const res = await fetchBackend.put(`/incoming-mails/changestatus/${id}`);
//       dispatch(setMessage(res.data));
//     } catch (error) {
//       dispatch(clearMessage());
//     }
//   };
// }

export function deleteMail(id) {
  return async (dispatch) => {
    dispatch(deleteIncomingMailStart());
    try {
      const res = await fetchBackend.delete(`/incoming-mails/${id}`);
      dispatch(deleteIncomingMailSuccess(res.data));
    } catch (error) {
      dispatch(deleteIncomingMailFailure());
    }
  };
}

export function deleteAllMails() {
  return async (dispatch) => {
    dispatch(deleteIncomingMailStart());
    try {
      const res = await fetchBackend.put(`/incoming-mails`);
      dispatch(deleteIncomingMailSuccess(res.data));
    } catch (error) {
      dispatch(deleteIncomingMailFailure());
    }
  };
}
