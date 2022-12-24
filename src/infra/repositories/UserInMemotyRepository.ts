import {
  IUserRepository,
  UserRepositoryData,
} from "../../data/repositories/IUser";

export class UserInMemoryRepository implements IUserRepository {
  private users: UserRepositoryData[] = [];

  async create(input: UserRepositoryData) {
    this.users.push(input);
  }

  async findById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}