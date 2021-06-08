import { IForm } from "./typing";
import useState, { Setter } from "hooks/useState";
import { Dispatch, SetStateAction } from "react";

const useForm = (): [
  IForm,
  Dispatch<SetStateAction<IForm>>,
  Setter<keyof IForm>
] => {
  const [form, setForm, setProp] = useState<IForm>({
    skip: 0,
    total: 0,
    items: [],
    keyword: '',
  });

  return [form, setForm, setProp];
};

export default useForm;
