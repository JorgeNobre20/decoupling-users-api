import { UserInMemoryRepository } from "../../infra/repositories";
import { getThrowedErrorType, NoErrorThrownError } from "../../tests";
import { NotFoundException } from "../../domain/exceptions";
import { FakeDeleteUserUseCaseBuilder } from "../../infra/builders/usecases/users";
import { FakeSignUpUseCaseBuilder } from "../../infra/builders/usecases/authentication";
import { SignUpUseCaseInput } from "../authentication/contracts";

const userRepository = UserInMemoryRepository.getInstance();

const fakeSignUpUseCase = new FakeSignUpUseCaseBuilder();
const signUpUseCase = fakeSignUpUseCase.build();

const deleteUserUseCaseBulder = new FakeDeleteUserUseCaseBuilder();
const deleteUserUseCase = deleteUserUseCaseBulder.build();

const userValidData: SignUpUseCaseInput = {
  name: "valid_name",
  email: "email@email.com",
  password: "valid_password",
  avatar: "valid_avatar",
};

describe("Delete User Use Case", () => {
  beforeEach(async () => {
    await userRepository.deleteAll();
  });

  it("should delete an user correctly when pass existing user id", async () => {
    const createdUserId = await signUpUseCase.exec(userValidData);
    await deleteUserUseCase.exec({ id: createdUserId });

    const removedUser = await userRepository.findById(createdUserId);
    expect(removedUser).toBeFalsy();
  });

  it("should throw not not found exception when pass a not existing user id", async () => {
    const invalidId = "invalid_id";

    const error = await getThrowedErrorType(() =>
      deleteUserUseCase.exec({ id: invalidId })
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(NotFoundException);
  });
});
