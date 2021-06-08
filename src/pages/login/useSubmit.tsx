import { IForm } from "./typing";
import { AxiosResponse } from "axios";
import { request } from "utils/request";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import { update } from "../../store/actions/auth";
import { useSnackbar } from "notistack";

const useSubmit = (): [(form: IForm) => Promise<void>, boolean] => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const callback = useCallback(
    async form => {
      setLoading(true);
      try {
        const resp = await request.post<any, AxiosResponse>(
          "/v1/admin/auth/signin",
          JSON.stringify(form),
        );
        dispatch(update({ token: resp.data.token }));
        history.push(history.location.state || "/");
      } catch (ex) {
        setLoading(false);
        enqueueSnackbar(ex.message, { variant: 'error' });
      }
    },
    [dispatch, history, enqueueSnackbar]
  );

  return [callback, loading];
};

export default useSubmit;
