import { combineReducers } from "redux";

import ui from "./ui";
import auth from "./auth";

export default combineReducers({
  ui,
  auth
});
