import { IForm } from "./typing";
import validate from "./validate";
import { request } from "utils/request";
import { useSnackbar } from "notistack";
import { useHistory, useParams } from "react-router";
import { useState, useCallback } from "react";

const useSave = (): [(form: Partial<IForm>) => Promise<void>, boolean] => {
  const history = useHistory();
  const params = useParams<any>();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const callback = useCallback(
    async (form: Partial<IForm>) => {
      setLoading(true);
      const error = validate(form);
      if (error) {
        setLoading(false);
        enqueueSnackbar(error, { variant: "error" });
        return;
      }

      try {
        if (params.id) {
          await request.patch(`/v1/schools/${params.id}`, JSON.stringify(form));
        } else {
          await request.post("/v1/schools", JSON.stringify(form));
        }
        enqueueSnackbar("Successed", { variant: "success" });
        history.push("/schools");
      } catch (ex) {
        setLoading(false);
        enqueueSnackbar(ex.message, { variant: "error" });
      }
    },
    [params, history, enqueueSnackbar]
  );

  return [callback, loading];
};

export default useSave;
