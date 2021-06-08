interface Action<T = any> {
  type: T;
}

interface PayloadAction<S> extends Action {
  payload: S;
}
