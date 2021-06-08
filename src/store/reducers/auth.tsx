import { Reducer } from "redux";
import { kUpdate } from "../actions/auth";

const reducer: Reducer<AuthReducer, PayloadAction<AuthReducer>> = (
  state = {
    token: ""
  },
  action
) => {
  switch (action.type) {
    case kUpdate:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default reducer;
