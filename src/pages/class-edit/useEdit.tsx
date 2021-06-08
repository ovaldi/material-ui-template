import { Dispatch, SetStateAction, useEffect } from "react";
import useFetch from "hooks/useFetch";
import { useParams } from "react-router";
import { request } from "utils/request";
import { IForm } from "./typing";

const api = async (id: string | number): Promise<Klass> => {
  const resp = await request.get(`/v1/classes/${id}`);
  return resp.data;
};

const useEdit = (setForm: Dispatch<SetStateAction<IForm>>): void => {
  const params = useParams<any>();
  const [request, response] = useFetch<Klass | null>(api, null);

  useEffect(() => {
    if (params.id) {
      request(params.id);
    }
  }, [request, params.id]);

  useEffect(() => {
    if (response) {
      setForm({
        ...response
      });
    }
  }, [setForm, response]);
};

export default useEdit;
