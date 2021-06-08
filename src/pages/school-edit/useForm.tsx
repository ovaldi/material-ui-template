import { IForm } from "./typing";
import { useState, Dispatch, SetStateAction } from "react";

const useForm = (): [IForm, Dispatch<SetStateAction<IForm>>] => {
  const [form, setForm] = useState<IForm>({
    name: ""
  });

  return [form, setForm];
};

export default useForm;
