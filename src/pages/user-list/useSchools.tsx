import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { request } from "utils/request";
import { useSnackbar } from "notistack";
import useState from "hooks/useState";

const useSchools = (): (id: number) => string => {
  const [hash, setHash] = useState<Hash>({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const resp = await request.get<any, AxiosResponse>("/v1/schools");
        const hash = resp.data.reduce((prev: Hash, next: School) => ({
          ...prev,
          [next.id]: next.name,
        }), {});
        setHash(hash);
      } catch (ex) {
        enqueueSnackbar(ex.message, { variant: "error" });
      }
    })();
  }, [enqueueSnackbar, setHash]);

  return (id: number): string => hash[id] || '';
};

export default useSchools;
