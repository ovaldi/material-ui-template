import { Reducer } from "redux";
import { kUpdate } from "../actions/ui";

const reducer: Reducer<UIReducer, PayloadAction<UIReducer>> = (
  state = {
    loading: 0,
    sidebar: "school"
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
