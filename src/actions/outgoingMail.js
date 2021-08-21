import { operations as c } from "./constants";

export const getOutgoingMailStart = () => ({
  type: c.GET_OUTGOING_MAIL_START,
});

export const getOutgoingMailSuccess = (mail) => ({
  type: c.GET_OUTGOING_MAIL_SUCCESS,
  payload: mail,
});

export const getOutgoingMailFailure = () => ({
  type: c.GET_OUTGOING_MAIL_FAIL,
});

export const getOutgoingMailsStart = () => ({
  type: c.GET_OUTGOING_MAILS_START,
});

export const getOutgoingMailsSuccess = (mails) => ({
  type: c.GET_OUTGOING_MAILS_SUCCESS,
  payload: mails,
});

export const getOutgoingMailsFailure = () => ({
  type: c.GGET_OUTGOING_MAILS_FAIL,
});

export const createOutgoingMailStart = () => ({
  type: c.CREATE_OUTGOING_MAIL_START,
});

export const createOutgoingMailSuccess = (mail) => ({
  type: c.CREATE_OUTGOING_MAIL_SUCCESS,
  payload: mail,
});

export const createOutgoingMailFailure = () => ({
  type: c.CREATE_OUTGOING_MAIL_FAIL,
});

export const updateOutgoingMailStart = () => ({
  type: c.UPDATE_OUTGOING_MAIL_START,
});

export const updateOutgoingMailSuccess = (mail) => ({
  type: c.UPDATE_OUTGOING_MAIL_SUCCESS,
  payload: mail,
});

export const updateOutgoingMailFailure = () => ({
  type: c.UPDATE_OUTGOING_MAIL_FAIL,
});

export const deleteOutgoingMailStart = () => ({
  type: c.DELETE_OUTGOING_MAIL_START,
});

export const deleteOutgoingMailSuccess = (mail) => ({
  type: c.DELETE_OUTGOING_MAIL_SUCCESS,
  payload: mail,
});

export const deleteOutgoingMailFailure = () => ({
  type: c.DELETE_OUTGOING_MAIL_FAIL,
});
