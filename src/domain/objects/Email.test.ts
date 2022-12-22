import { Email } from "./Email";

describe("Email Object Value", () => {
  it("should instance email object value correctly when pass valid data", () => {
    const email = "valid@email.com";
    const emailInstace = new Email(email);

    expect(emailInstace.getEmail()).toEqual(email);
  });

  it("should throw exception when try to instance email object value with invalid email", () => {
    const email = "invalidemail.com";
    expect(() => {
      new Email(email);
    }).toThrowError();
  });
});
