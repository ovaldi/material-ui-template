import { request } from "utils/request";
import { useSnackbar } from "notistack";
import { useState, useCallback, Dispatch, SetStateAction } from "react";
import { IForm } from "./typing";

const useRemove = (
  setForm: Dispatch<SetStateAction<IForm>>
): [(id: number) => Promise<void>, boolean] => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const callback = useCallback(
    async (id: number) => {
      try {
        await request.delete(`/v1/classes/${id}`);
        enqueueSnackbar("Successed", { variant: "success" });
        setForm(x => ({
          ...x,
          classes: x.classes.filter(it => it.id !== id)
        }));
      } catch (ex) {
        setLoading(false);
        enqueueSnackbar(ex.message, { variant: "error" });
      }
    },
    [setForm, enqueueSnackbar]
  );

  return [callback, loading];
};

export default useRemove;
