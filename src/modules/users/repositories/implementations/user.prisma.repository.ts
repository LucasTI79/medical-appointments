import { prismaClient } from "../../../../infra/databases/prisma.config";
import { User } from "../../entities/user.entity";
import { IUserRepository } from "../user.repository";

export class UserPrismaRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prismaClient.user.findFirst({ where: { id } });
    return user || null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await prismaClient.user.findFirst({ where: { username } });
    return user || null;
  }
  async save(data: User): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        name: data.name,
        username: data.username,
        password: data.password,
      },
    });

    return user;
  }
}
