import { combineReducers } from "redux";
import auth from "./auth";
import operations from "./operations";
import messages from "./messages";

const rootReducer = combineReducers({
  auth,
  operations,
  messages,
});

export default rootReducer;
