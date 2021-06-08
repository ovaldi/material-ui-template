import { IForm } from "./typing";

const validate = (form: Partial<IForm>): string | void => {
  if (!form.name) {
    return "`Name` is required";
  }
  if (!form.school_id) {
    return "`School` is required";
  }
};

export default validate;
