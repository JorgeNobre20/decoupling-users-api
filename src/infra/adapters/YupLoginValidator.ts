import * as Yup from "yup";

import { IDataValidator } from "../../adpaters";
import { YupValidator } from "./YupValidator";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email should be valid")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export type LoginDataValidation = {
  email: string;
  password: string;
};

export class YupLoginValidator
  extends YupValidator
  implements IDataValidator<LoginDataValidation>
{
  async validate(data: LoginDataValidation) {
    try {
      await this.tryValidate(LoginSchema, data);
    } catch (error) {
      this.catchError(error);
    }
  }
}
