import { request } from "utils/request";
import { useSnackbar } from "notistack";
import { useState, useCallback, Dispatch, SetStateAction } from "react";

const useRemove = (
  setSchools: Dispatch<SetStateAction<School[]>>
): [(id: number) => Promise<void>, boolean] => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const callback = useCallback(
    async (id: number) => {
      try {
        await request.delete(`/v1/schools/${id}`);
        enqueueSnackbar("Successed", { variant: "success" });
        setSchools(x => x.filter(it => it.id !== id));
      } catch (ex) {
        setLoading(false);
        enqueueSnackbar(ex.message, { variant: "error" });
      }
    },
    [setSchools, enqueueSnackbar]
  );

  return [callback, loading];
};

export default useRemove;
