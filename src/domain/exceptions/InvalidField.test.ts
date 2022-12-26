import { InvalidField } from "./InvalidField";

describe("Invalid Field", () => {
  it("should instanciate invalid field correctly", async () => {
    const fieldName = "any_fieldname";
    const receivedValue = "any_received_value";
    const fieldErrors = ["error 1", "error 2"];

    const invalidField = new InvalidField({
      errors: fieldErrors,
      fieldName,
      receivedValue,
    });

    expect(invalidField.getErrors()).toHaveLength(fieldErrors.length);
    expect(invalidField.getFieldName()).toEqual(fieldName);
    expect(invalidField.getReceivedValue()).toEqual(receivedValue);
  });
});
