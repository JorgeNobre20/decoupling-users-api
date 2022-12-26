import { InvalidDataException } from "./InvalidData";
import { InvalidField } from "./InvalidField";

describe("Invalid Data Exception", () => {
  it("should instanciate an invalid data exception correctly", async () => {
    const invalidFieldError = new InvalidField({
      errors: ["error 1"],
      fieldName: "fieldname",
      receivedValue: "any_Value",
    });

    const invalidFieldError2 = new InvalidField({
      errors: ["error 2"],
      fieldName: "fieldname",
      receivedValue: "any_Value",
    });

    const invalidFieldErrors = [invalidFieldError, invalidFieldError2];

    const invalidDataException = new InvalidDataException(invalidFieldErrors);
    expect(invalidDataException.getErrors()).toHaveLength(
      invalidFieldErrors.length
    );
  });
});
