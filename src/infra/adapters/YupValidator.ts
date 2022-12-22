import * as Yup from "yup";
import {
  InvalidDataException,
  InvalidField,
  InvalidFieldProps,
} from "../../domain/exceptions";

export abstract class YupValidator {
  protected parseErrorAndThrowInvalidDataException(
    validationError: Yup.ValidationError
  ) {
    const parsedErrors: InvalidField[] = [];
    const { inner } = validationError;

    inner.forEach((error) => {
      const parsedError = this.parseErrorToInvalidField(error);
      parsedErrors.push(parsedError);
    });

    throw new InvalidDataException(parsedErrors);
  }

  private parseErrorToInvalidField(
    fieldValidationError: Yup.ValidationError
  ): InvalidField {
    const invalidFieldProps: InvalidFieldProps = {
      fieldName: fieldValidationError.path!,
      errors: fieldValidationError.errors,
      receivedValue: fieldValidationError.value,
    };

    return new InvalidField(invalidFieldProps);
  }

  protected async tryValidate(schema: Yup.AnyObjectSchema, data: any) {
    const options = {
      abortEarly: false,
    };

    await schema.validate(data, options);
  }

  protected catchError(error: unknown) {
    const parsedError = error as Yup.ValidationError;
    this.parseErrorAndThrowInvalidDataException(parsedError);
  }
}
