export type UserRepositoryData = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export interface IUserRepository {
  create: (input: UserRepositoryData) => Promise<void>;
  findById: (id: string) => Promise<UserRepositoryData | undefined>;
  findByEmail: (email: string) => Promise<UserRepositoryData | undefined>;
  update: (input: UserRepositoryData) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
