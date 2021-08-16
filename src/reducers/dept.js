import { operations as c } from "../actions/constants";

const initialState = { departments: [], isFetching: false, error: false };

export default function deptReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case c.GET_DEPTS_START:
      return {
        ...state,
        departments: [],
        isFetching: true,
        error: false,
      };

    case c.GET_DEPTS_SUCCESS:
      return {
        ...state,
        departments: payload,
        isFetching: false,
        error: false,
      };

    case c.GET_DEPTS_FAILURE:
      return {
        ...state,
        departments: [],
        isFetching: false,
        error: true,
      };

    case c.GET_DEPT_START:
      return {
        ...state,
        department: {},
        isFetching: true,
        error: false,
      };

    case c.GET_DEPT_SUCCESS:
      return {
        ...state,
        department: payload,
        isFetching: false,
        error: false,
      };

    case c.GET_DEPT_FAILURE:
      return {
        ...state,
        departments: [],
        isFetching: false,
        error: true,
      };

    default:
      return state;
  }
}
