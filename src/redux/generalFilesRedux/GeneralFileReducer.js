const GeneralFileReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        general_files: [],
        isFetching: true,
        error: false,
      };

    case "GET_GENERAL_FILES_SUCCESS":
      return {
        general_files: action.payload,
        isFetching: false,
        error: false,
      };

    case "GET_GENERAL_FILES_FAILURE":
      return {
        general_files: [],
        isFetching: false,
        error: true,
      };

    default:
      return { ...state };
  }
};

export default GeneralFileReducer;
