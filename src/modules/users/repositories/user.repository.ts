import { User } from "../entities/user.entity";

export interface IUserRepository {
  findByUsername(username: string): Promise<User | null>;
  save(data: User): Promise<User>;
  findById(id: string): Promise<User | null>;
}
