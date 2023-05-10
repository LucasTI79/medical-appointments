import { CustomError } from "../../../../errors/custom.error";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { IToken } from "../../../../infra/shared/token/token";
import { User } from "../../entities/user.entity";
import { IUserRepository } from "../../repositories/user.repository";

type AuthenticateRequest = {
  username: string;
  password: string;
};

export class AuthenticateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordCrypto: IPasswordCrypto,
    private readonly token: IToken
  ) {}
  async execute({ username, password }: AuthenticateRequest): Promise<string> {
    if (!username || !password) {
      throw new CustomError("Invalid credentials", 401);
    }

    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new CustomError("Invalid credentials", 401);
    }

    const validPassword = await this.passwordCrypto.compare(
      password,
      user.password
    );

    if (!validPassword) {
      throw new CustomError("Invalid credentials", 401);
    }

    const tokenGenerated = this.token.create(user);

    return tokenGenerated;
  }
}
