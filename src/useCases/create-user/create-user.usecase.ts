import { User } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";

type UserRequest = {
  name: string;
  username: string;
  password: string;
};

export class CreateUserUseCase {
  async execute(data: UserRequest): Promise<User> {
    const userRepository = UserRepository.getInstance();
    const user = User.create(data);

    if (!data.username || !data.password) {
      throw new Error("Username and password are required");
    }

    const existUser = await userRepository.findByUsername(data.username);

    if (existUser) {
      throw new Error("Username already exists");
    }

    const userCreated = await userRepository.save(user);
    return userCreated;
  }
}
