import { IForm } from "./typing";

import useState, { Setter } from "hooks/useState";
import { Dispatch, SetStateAction } from "react";

const useForm = (): [
  Partial<IForm>,
  Dispatch<SetStateAction<Partial<IForm>>>,
  Setter<keyof IForm>
] => {
  const [form, setForm, setProp] = useState<Partial<IForm>>({});
  return [form, setForm, setProp];
};

export default useForm;
