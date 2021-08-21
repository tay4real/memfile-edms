import { fetchBackend } from "./index";
import {
  getOutgoingMailStart,
  getOutgoingMailSuccess,
  getOutgoingMailFailure,
  getOutgoingMailsFailure,
  getOutgoingMailsStart,
  getOutgoingMailsSuccess,
  createOutgoingMailStart,
  createOutgoingMailSuccess,
  createOutgoingMailFailure,
  updateOutgoingMailStart,
  updateOutgoingMailSuccess,
  updateOutgoingMailFailure,
  deleteOutgoingMailStart,
  deleteOutgoingMailSuccess,
  deleteOutgoingMailFailure,
} from "../actions/outgoingMail";

export function fetchAllOutgoingMails() {
  return async (dispatch) => {
    dispatch(getOutgoingMailsStart());
    try {
      const res = await fetchBackend.get("/outgoing-mails");
      dispatch(getOutgoingMailsSuccess(res.data));
    } catch (error) {
      dispatch(getOutgoingMailsFailure());
    }
  };
}

export function searchOutgoingMails(query) {
  return async (dispatch) => {
    dispatch(getOutgoingMailsStart());
    try {
      const res = await fetchBackend.get(`/outgoing-mails?${query}`);
      dispatch(getOutgoingMailsSuccess(res.data));
    } catch (error) {
      dispatch(getOutgoingMailsFailure());
    }
  };
}

export function fetchOutgoingMailByID(mailID) {
  return async (dispatch) => {
    dispatch(getOutgoingMailStart());
    try {
      const res = await fetchBackend.get(`/outgoing-mails/${mailID}`);
      dispatch(getOutgoingMailSuccess(res.data));
    } catch (error) {
      dispatch(getOutgoingMailFailure());
    }
  };
}

export function addNewMail(mail) {
  return async (dispatch) => {
    dispatch(createOutgoingMailStart());
    try {
      const res = await fetchBackend.post("/outgoing-mails", mail);
      dispatch(createOutgoingMailSuccess(res.data));
    } catch (error) {
      dispatch(createOutgoingMailFailure());
    }
  };
}

export function uploadMailScan(mailID, file_image) {
  return async (dispatch) => {
    dispatch(updateOutgoingMailStart());
    try {
      const res = await fetchBackend.post(
        `/outgoing-mails/${mailID}/upload`,
        file_image
      );
      dispatch(updateOutgoingMailSuccess(res.data));
    } catch (error) {
      dispatch(updateOutgoingMailFailure());
    }
  };
}

export function editMail(id, mail) {
  return async (dispatch) => {
    dispatch(updateOutgoingMailStart());
    try {
      const res = await fetchBackend.put(`/outgoing-mails/${id}`, mail);
      dispatch(updateOutgoingMailSuccess(res.data));
    } catch (error) {
      dispatch(updateOutgoingMailFailure());
    }
  };
}

// export function changeMailStatus(id) {
//   return async (dispatch) => {
//     try {
//       dispatch(clearMessage());
//       dispatch(clearErrMessage());
//       const res = await fetchBackend.put(`/outgoing-mails/changestatus/${id}`);
//       dispatch(setMessage(res.data));
//     } catch (error) {
//       dispatch(clearMessage());
//     }
//   };
// }

export function deleteMail(id) {
  return async (dispatch) => {
    dispatch(deleteOutgoingMailStart());
    try {
      const res = await fetchBackend.delete(`/outgoing-mails/${id}`);
      dispatch(deleteOutgoingMailSuccess(res.data));
    } catch (error) {
      dispatch(deleteOutgoingMailFailure());
    }
  };
}

export function deleteAllMails() {
  return async (dispatch) => {
    dispatch(deleteOutgoingMailStart());
    try {
      const res = await fetchBackend.put(`/outgoing-mails-mails`);
      dispatch(deleteOutgoingMailStart(res.data));
    } catch (error) {
      dispatch(deleteOutgoingMailFailure(error.response.data));
    }
  };
}
