import * as Yup from "yup";

import { IDataValidator } from "../../adpaters";
import { YupValidator } from "./YupValidator";

const UserSchema = Yup.object().shape({
  id: Yup.string().required("ID is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Email should be valid")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  avatar: Yup.string().required("Avatar is required"),
});

export type UserDataValidation = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export class YupUserValidator
  extends YupValidator
  implements IDataValidator<UserDataValidation>
{
  async validate(data: UserDataValidation) {
    try {
      await this.tryValidate(UserSchema, data);
    } catch (error) {
      this.catchError(error);
    }
  }
}
