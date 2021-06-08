import { isEmpty } from "lodash";
import { IForm } from "./typing";

const validate = (form: IForm): string | void => {
  if (isEmpty(form.name)) {
    return "`Name` is required";
  }
  if (isEmpty(form.level)) {
    return "`Level` is required";
  }
  if (isEmpty(form.program)) {
    return "`Program` is required";
  }
  if (!form.section) {
    return "`Section` is required";
  }
  if (!form.school_id) {
    return "`School` is required";
  }
};

export default validate;
