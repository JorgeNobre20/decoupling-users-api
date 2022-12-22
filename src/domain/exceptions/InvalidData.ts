import { InvalidField } from "./InvalidField";

export class InvalidDataException extends Error {
  private errors: InvalidField[];

  constructor(errors: InvalidField[]) {
    super("Invalid Data");
    this.errors = errors;
  }

  getErrors() {
    return this.errors;
  }
}
