import { operations as c } from "./constants";

export function getAllDepts(depts) {
  return (dispatch) => {
    dispatch({
      type: c.GET_ALLDEPTS,
      payload: depts,
    });
  };
}

export function getAllDeptsFail() {
  return (dispatch) => {
    dispatch({
      type: c.GET_ALLDEPTS_FAIL,
    });
  };
}

export function getDept(dept) {
  return (dispatch) => {
    dispatch({
      type: c.GET_DEPT,
      payload: dept,
    });
  };
}

export function getDeptFail() {
  return (dispatch) => {
    dispatch({
      type: c.GET_DEPT_FAIL,
    });
  };
}

export function getAllMDAS(mdas) {
  return (dispatch) => {
    dispatch({
      type: c.GET_ALLMDAS,
      payload: mdas,
    });
  };
}

export function getAllMDAFail() {
  return (dispatch) => {
    dispatch({
      type: c.GET_ALLMDAS_FAIL,
    });
  };
}

export function getMDA(mda) {
  return (dispatch) => {
    dispatch({
      type: c.GET_MDA,
      payload: mda,
    });
  };
}

export function getMDAFail() {
  return (dispatch) => {
    dispatch({
      type: c.GET_MDA_FAIL,
    });
  };
}

export function getAllFiles(files) {
  return (dispatch) => {
    dispatch({
      type: c.GET_ALLFILES,
      payload: files,
    });
  };
}

export function getAllFilesFail() {
  return (dispatch) => {
    dispatch({
      type: c.GET_ALLFILES_FAIL,
    });
  };
}

export function getPersonalFiles(files) {
  return (dispatch) => {
    dispatch({
      type: c.GET_PERSONALFILES,
      payload: files,
    });
  };
}

export function getPersonalFilesFail() {
  return (dispatch) => {
    dispatch({
      type: c.GET_PERSONALFILES_FAIL,
    });
  };
}

export function getGeneralFiles(files) {
  return (dispatch) => {
    dispatch({
      type: c.GET_GENERALFILES,
      payload: files,
    });
  };
}

export function getGeneralFilesFail() {
  return (dispatch) => {
    dispatch({
      type: c.GET_GENERALFILES_FAIL,
    });
  };
}

export function getFile(file) {
  return (dispatch) => {
    dispatch({
      type: c.GET_FILE,
      payload: file,
    });
  };
}

export function getFileFail() {
  return (dispatch) => {
    dispatch({
      type: c.GET_FILE_FAIL,
    });
  };
}

export function getMailsSucess(mails) {
  return (dispatch) => {
    dispatch({
      type: c.GET_MAILS_SUCCESS,
      payload: mails,
    });
  };
}

export function getMailsFail() {
  return (dispatch) => {
    dispatch({
      type: c.GET_MAILS_FAIL,
    });
  };
}

export function getMail(mail) {
  return (dispatch) => {
    dispatch({
      type: c.GET_MAIL,
      payload: mail,
    });
  };
}

export function getMailFail() {
  return (dispatch) => {
    dispatch({
      type: c.GET_MAIL_FAIL,
    });
  };
}
export function getUserProfile(user) {
  return (dispatch) => {
    dispatch({
      type: c.GET_USER_PROFILE,
      payload: user,
    });
  };
}

export function getUserProfileFail() {
  return (dispatch) => {
    dispatch({
      type: c.GET_USER_PROFILE_FAIL,
    });
  };
}

export function getUserById(user) {
  return (dispatch) => {
    dispatch({
      type: c.GET_USER_BY_ID,
      payload: user,
    });
  };
}

export function getUserByIdFail() {
  return (dispatch) => {
    dispatch({
      type: c.GET_USER_BY_ID_FAIL,
    });
  };
}

export function getAllUsers(users) {
  return (dispatch) => {
    dispatch({
      type: c.GET_ALL_USERS,
      payload: users,
    });
  };
}

export function getAllUsersFail() {
  return (dispatch) => {
    dispatch({
      type: c.GET_ALL_USERS_FAIL,
    });
  };
}
