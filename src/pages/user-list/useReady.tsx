import { IForm } from "./typing";
import useQuery from "hooks/useQuery";
import { AxiosResponse } from "axios";
import { request } from "utils/request";
import { useSnackbar } from "notistack";
import { Dispatch, SetStateAction, useEffect } from "react";

const useReady = (setForm: Dispatch<SetStateAction<IForm>>): void => {
  const query = useQuery();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const resp = await request.get<any, AxiosResponse>(
          `/v1/admin/users`,
          {
            params: {
              take: 20,
              skip: parseInt(query.skip) || 0,
              keyword: query.keyword || '',
            }
          }
        );
        setForm(x => ({
          ...x,
          total: resp.data.total,
          items: resp.data.items,
          skip: parseInt(query.skip) || 0,
          keyword: query.keyword || '',
        }));
      } catch (ex) {
        enqueueSnackbar(ex.message, { variant: "error" });
      }
    })();
  }, [
    query.skip,
    query.keyword,
    setForm,
    enqueueSnackbar,
  ]);
};

export default useReady;
