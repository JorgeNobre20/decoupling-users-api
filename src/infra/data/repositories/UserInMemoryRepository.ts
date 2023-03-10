import {
  IUserRepository,
  UserRepositoryData,
} from "../../../data/repositories/IUser";

export class UserInMemoryRepository implements IUserRepository {
  private users: UserRepositoryData[] = [];
  private static instance: IUserRepository;

  private constructor() {}

  public static getInstance(): IUserRepository {
    if (!UserInMemoryRepository.instance) {
      UserInMemoryRepository.instance = new UserInMemoryRepository();
    }

    return UserInMemoryRepository.instance;
  }

  async create(input: UserRepositoryData) {
    this.users.push(input);
  }

  async findById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async findByEmailAndPassword(email: string, password: string) {
    return this.users.find(
      (user) => user.email === email && user.password === password
    );
  }

  async update(input: UserRepositoryData) {
    const remaningUsers = this.users.filter((user) => user.id !== input.id);
    this.users = [...remaningUsers, input];
  }

  async delete(id: string) {
    const remaningUsers = this.users.filter((user) => user.id !== id);
    this.users = remaningUsers;
  }

  async deleteAll() {
    this.users = [];
  }
}
