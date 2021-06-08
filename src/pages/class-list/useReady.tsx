import { IForm } from "./typing";
import { AxiosResponse } from "axios";
import { request } from "utils/request";
import { useSnackbar } from "notistack";
import { Dispatch, SetStateAction, useEffect } from "react";
import useQuery from "hooks/useQuery";

const useReady = (setForm: Dispatch<SetStateAction<IForm>>): void => {
  const query = useQuery();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (query.school_id) {
      (async () => {
        try {
          const resp = await request.get<any, AxiosResponse>(
            `/v1/schools/${query.school_id}/classes-with-count`,
            {
              params: {
                take: 20,
                skip: query.skip || 0
              }
            }
          );
          setForm(x => ({
            ...x,
            skip: (query.skip as any) || 0,
            total: resp.data.total,
            classes: resp.data.items
          }));
        } catch (ex) {
          enqueueSnackbar(ex.message, { variant: "error" });
        }
      })();
    }
  }, [enqueueSnackbar, setForm, query.skip, query.school_id]);
};

export default useReady;
