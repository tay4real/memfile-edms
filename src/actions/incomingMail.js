import { operations as c } from "./constants";

export const getIncomingMailStart = () => ({
  type: c.GET_INCOMING_MAIL_START,
});

export const getIncomingMailSuccess = (mail) => ({
  type: c.GET_INCOMING_MAIL_SUCCESS,
  payload: mail,
});

export const getIncomingMailFailure = () => ({
  type: c.GET_INCOMING_MAIL_FAIL,
});

export const getIncomingMailsStart = () => ({
  type: c.GET_INCOMING_MAILS_START,
});

export const getIncomingMailsSuccess = (mails) => ({
  type: c.GET_INCOMING_MAILS_SUCCESS,
  payload: mails,
});

export const getIncomingMailsFailure = () => ({
  type: c.GET_INCOMING_MAILS_FAIL,
});

export const createIncomingMailStart = () => ({
  type: c.CREATE_INCOMING_MAIL_START,
});

export const createIncomingMailSuccess = (mail) => ({
  type: c.CREATE_INCOMING_MAIL_SUCCESS,
  payload: mail,
});

export const createIncomingMailFailure = (error) => ({
  type: c.CREATE_INCOMING_MAIL_FAIL,
  payload: error,
});

export const updateIncomingMailStart = () => ({
  type: c.UPDATE_INCOMING_MAIL_START,
});

export const updateIncomingMailSuccess = (mail) => ({
  type: c.UPDATE_INCOMING_MAIL_SUCCESS,
  payload: mail,
});

export const updateIncomingMailFailure = () => ({
  type: c.UPDATE_INCOMING_MAIL_FAIL,
});

export const deleteIncomingMailStart = () => ({
  type: c.DELETE_INCOMING_MAIL_START,
});

export const deleteIncomingMailSuccess = (mail) => ({
  type: c.DELETE_INCOMING_MAIL_SUCCESS,
  payload: mail,
});

export const deleteIncomingMailFailure = () => ({
  type: c.DELETE_INCOMING_MAIL_FAIL,
});
