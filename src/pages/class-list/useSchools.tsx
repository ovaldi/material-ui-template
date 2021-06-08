import { IForm } from "./typing";
import useQuery from "hooks/useQuery";
import { AxiosResponse } from "axios";
import { request } from "utils/request";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";
import { Dispatch, SetStateAction, useEffect } from "react";

const useSchools = (setForm: Dispatch<SetStateAction<IForm>>): void => {
  const query = useQuery();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const resp = await request.get<any, AxiosResponse>("/v1/schools");
        if (query.school_id) {
          setForm(x => ({
            ...x,
            schools: resp.data
          }));
        } else {
          history.push("/classes?school_id=" + resp.data[0].id);
        }
      } catch (ex) {
        enqueueSnackbar(ex.message, { variant: "error" });
      }
    })();
  }, [enqueueSnackbar, setForm, history, query.school_id]);
};

export default useSchools;
