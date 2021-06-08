import { isEmpty } from "lodash";
import { IForm } from "./typing";

const validate = (form: Partial<IForm>): string | void => {
  if (isEmpty(form.name)) {
    return "Name is required";
  }
};

export default validate;
