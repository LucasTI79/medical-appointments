import { User } from "../../entities/user.entity";
import { ParameterRequiredError } from "../../../../errors/parameter-required-error";
import { IUserRepository } from "../../repositories/user.repository";
import { CustomError } from "../../../../errors/custom.error";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";

type UserRequest = {
  name: string;
  username: string;
  password: string;
};

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: UserRequest): Promise<User> {
    const user = await User.create(data);

    const existUser = await this.userRepository.findByUsername(data.username);

    if (existUser) {
      throw new CustomError(
        "Username already exists",
        400,
        "USER_EXISTS_ERROR"
      );
    }

    const userCreated = await this.userRepository.save(user);
    return userCreated;
  }
}
