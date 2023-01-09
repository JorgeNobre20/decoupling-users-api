import {
  IUserRepository,
  UserRepositoryData
} from "../../../data/repositories/IUser";
import { knexConnection } from "../database";

export class KnexUserRepository implements IUserRepository {
  private static instance: IUserRepository;
  private readonly tableName = "users";

  private constructor() {}

  public static getInstance(): IUserRepository {
    if (!KnexUserRepository.instance) {
      KnexUserRepository.instance = new KnexUserRepository();
    }

    return KnexUserRepository.instance;
  }

  async create(input: UserRepositoryData) {
    await knexConnection<UserRepositoryData>(this.tableName)
      .insert(input)
      .returning("id");
  }

  async findById(id: string) {
    return knexConnection<UserRepositoryData>(this.tableName)
      .select("*")
      .where("id", "=", id)
      .first();
  }

  async findByEmail(email: string) {
    return knexConnection<UserRepositoryData>(this.tableName)
      .select("*")
      .where("email", "=", email)
      .first();
  }

  async findByEmailAndPassword(email: string, password: string) {
    return knexConnection<UserRepositoryData>(this.tableName)
      .select("*")
      .where("email", "=", email)
      .and.where("password", "=", password)
      .first();
  }

  async update(input: UserRepositoryData) {
    await knexConnection<UserRepositoryData>(this.tableName)
      .update({
        name: input.name,
        email: input.email,
        password: input.password,
        avatar: input.avatar
      })
      .where("id", "=", input.id);
  }

  async delete(id: string) {
    await knexConnection<UserRepositoryData>(this.tableName)
      .delete()
      .where("id", "=", id);
  }

  async deleteAll() {
    await knexConnection<UserRepositoryData>(this.tableName).delete();
  }
}
