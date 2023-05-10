import { User } from "../../entities/user.entity";
import { IUserRepository } from "../user.repository";

export class UserMemoryRepository implements IUserRepository {
  private users: User[];
  private static instance: UserMemoryRepository;

  constructor() {
    this.users = [];
  }
  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  static getInstance(): UserMemoryRepository {
    if (!UserMemoryRepository.instance) {
      UserMemoryRepository.instance = new UserMemoryRepository();
    }
    return UserMemoryRepository.instance;
  }

  async findByUsername(username: string) {
    return this.users.find((user) => user.username === username) || null;
  }

  async save(data: User): Promise<User> {
    this.users.push(data);
    return data;
  }
}
