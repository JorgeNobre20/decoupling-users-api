import { getThrowedErrorType, NoErrorThrownError } from "./getThrowedErrorType";

describe("Get Throwed Error Type Helper Function", () => {
  it("should return NoErrorThrownError when everything runs correctly", async () => {
    const error = await getThrowedErrorType(() => {});
    expect(error).toBeInstanceOf(NoErrorThrownError);
  });

  it("should not return NoErrorThrownError when some error ocurred", async () => {
    const error = await getThrowedErrorType(() => {
      throw new Error("Error");
    });
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
  });
});
