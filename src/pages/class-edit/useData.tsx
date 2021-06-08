import { AxiosResponse } from "axios";
import { request } from "utils/request";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

const useData = (): School[] => {
  const { enqueueSnackbar } = useSnackbar();
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const resp = await request.get<any, AxiosResponse>("/v1/schools");
        setSchools(resp.data);
      } catch (ex) {
        enqueueSnackbar(ex.message, { variant: "error" });
      }
    })();
  }, [enqueueSnackbar]);

  return schools;
};

export default useData;
