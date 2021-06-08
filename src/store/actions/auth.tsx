export const kUpdate = "auth/update";

export const update = (
  payload: Partial<AuthReducer>
): PayloadAction<Partial<AuthReducer>> => {
  return {
    type: kUpdate,
    payload: payload
  };
};

export const logout = (): PayloadAction<Partial<AuthReducer>> => {
  return {
    type: kUpdate,
    payload: {
      token: ""
    },
  };
};
