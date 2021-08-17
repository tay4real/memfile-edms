import { FALSE } from "node-sass";
import { operations as c } from "../actions/constants";

const initialState = {
  depts: null,
  dept: null,
  mdas: null,
  mda: null,
  users: [],
  user_profile: null,
  files: null,
  general_files: null,
  general_file: null,
  mails: null,
  incoming_mails: null,
  outgoing_mails: null,
  mail: null,
  incoming_mail: null,
  outgoing_mail: null,
  loading: false,
};

export default function operations(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case c.GET_ALLDEPTS:
      return { ...state, depts: payload, loading: false };

    case c.GET_ALLDEPTS_FAIL:
      return { ...state, depts: null, loading: true };

    case c.GET_DEPT:
      return { ...state, dept: payload, loading: false };

    case c.GET_DEPT_FAIL:
      return { ...state, dept: null, loading: true };
    case c.GET_ALLMDAS:
      return { ...state, mdas: payload, loading: false };

    case c.GET_ALLMDAS_FAIL:
      return { ...state, mdas: null, loading: true };

    case c.GET_MDA:
      return { ...state, mda: payload, loading: false };

    case c.GET_MDA_FAIL:
      return { ...state, mda: null, loading: true };

    case c.GET_ALL_USERS:
      return { ...state, users: payload, loading: false };

    case c.GET_USERS_FAIL:
      return { ...state, users: [], loading: true };

    case c.GET_USER_PROFILE:
      return { ...state, user_profile: payload, loading: false };

    case c.GET_USER_PROFILE_FAIL:
      return { ...state, user_profile: null, loading: true };

    case c.GET_USER_BY_ID:
      return { ...state, user_profile: payload, loading: false };

    case c.GET_USER_BY_ID_FAIL:
      return { ...state, user_profile: null, loading: true };

    case c.GET_ALLFILES:
      return { ...state, files: payload };

    case c.GET_ALLFILES_FAIL:
      return { ...state, files: null, loading: false };

    case c.GET_GENERALFILES:
      return { ...state, general_files: payload };

    case c.GET_GENERALFILES_FAIL:
      return { ...state, general_files: null, loading: false };

    case c.GET_FILE:
      return { ...state, general_file: payload };

    case c.GET_FILE_FAIL:
      return { ...state, general_file: null, loading: false };
    case c.GET_MAILS_SUCCESS:
      return { ...state, mails: payload, loading: false };
    case c.GET_INCOMING_MAILS_SUCCESS:
      return { ...state, incoming_mails: payload, loading: false };
    case c.GET_OUTGOING_MAILS_SUCCESS:
      return { ...state, outgoing_mails: payload, loading: false };
    case c.GET_INCOMING_MAILS_FAIL:
      return { ...state, incoming_mails: null, loading: false };
    case c.GET_OUTGOING_MAILS_FAIL:
      return { ...state, outgoing_mails: null, loading: false };
    case c.GET_MAILS_FAIL:
      return { ...state, mails: null, loading: false };
    case c.GET_MAIL:
      return { ...state, mail: payload, loading: false };

    case c.GET_INCOMING_MAIL_SUCCESS:
      return { ...state, incoming_mail: payload, loading: false };

    case c.GET_OUTGOING_MAIL_SUCCESS:
      return { ...state, outgoing_mail: payload, loading: false };

    case c.GET_MAIL_FAIL:
      return { ...state, mail: null, loading: false };
    case c.GET_INCOMING_MAIL_FAIL:
      return { ...state, incoming_mail: null, loading: false };
    case c.GET_OUTGOING_MAIL_FAIL:
      return { ...state, outgoing_mail: null, loading: false };
    default:
      return state;
  }
}
