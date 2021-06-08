import { IForm } from "./typing";
import useFetch from "hooks/useFetch";
import { request } from "utils/request";
import { useParams } from "react-router";
import { Dispatch, SetStateAction, useEffect } from "react";

const api = async (id: string | number): Promise<User> => {
  const resp = await request.get(`/v1/admin/users/${id}`);
  return resp.data;
};

const useEdit = (setForm: Dispatch<SetStateAction<Partial<IForm>>>): void => {
  const params = useParams<any>();
  const [request, response] = useFetch<Partial<User>>(api, {});

  useEffect(() => {
    if (params.id) {
      request(params.id);
    }
  }, [request, params.id]);

  useEffect(() => {
    setForm({
      ...response,
    });
  }, [setForm, response]);
};

export default useEdit;
