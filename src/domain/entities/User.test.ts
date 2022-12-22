import { UserEntity, UserEntityProps } from "./User";

describe("User Entity", () => {
  it("should instance user entity correctly when pass valid data", () => {
    const userData: UserEntityProps = {
      id: "any_id",
      email: "valid@email.com",
      name: "any_name",
      password: "any_password",
      avatar: "any_avatar",
    };

    const userEntity = new UserEntity(userData);

    expect(userEntity.getId()).toEqual(userData.id);
    expect(userEntity.getName()).toEqual(userData.name);
    expect(userEntity.getEmail()).toEqual(userData.email);
    expect(userEntity.getPassword()).toEqual(userData.password);
    expect(userEntity.getAvatar()).toEqual(userData.avatar);
  });
});
