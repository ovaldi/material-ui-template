import React, { Dispatch, SetStateAction, useCallback } from "react";

export interface Setter<K> {
  (key: K): (value: any) => void;
}

export const useState = <S extends {}>(
  init: S | (() => S)
): [S, Dispatch<SetStateAction<S>>, Setter<keyof S>] => {
  const [state, setState] = React.useState<S>(init);
  const setValue = useCallback<Setter<keyof S>>(
    key => value => {
      setState(old => ({
        ...old,
        [key]: value
      }));
    },
    []
  );
  return [state, setState, setValue];
};

export default useState;
