import { ThunkAction } from "redux-thunk";

export const kUpdate = "ui/update";

export const update = (
  payload: Partial<UIReducer>
): PayloadAction<Partial<UIReducer>> => {
  return {
    type: kUpdate,
    payload: payload
  };
};

export const load = (
  count: number
): ThunkAction<
  any,
  { ui: UIReducer },
  any,
  PayloadAction<Partial<UIReducer>>
> => {
  return async (dispatch, getState) => {
    dispatch({
      type: kUpdate,
      payload: {
        loading: getState().ui.loading + count
      }
    });
  };
};
