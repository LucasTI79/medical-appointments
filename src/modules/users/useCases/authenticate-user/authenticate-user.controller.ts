import { Request, Response } from "express";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { IToken } from "../../../../infra/shared/token/token";
import { IUserRepository } from "../../repositories/user.repository";
import { AuthenticateUserUseCase } from "./authenticate-user.usecase";

export class AuthenticateUserController {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordCrypto: IPasswordCrypto,
    private readonly token: IToken
  ) {}
  async handle(request: Request, response: Response) {
    const data = request.body;
    const authenticatedUserUseCase = new AuthenticateUserUseCase(
      this.userRepository,
      this.passwordCrypto,
      this.token
    );
    const result = await authenticatedUserUseCase.execute(data);
    return response.json(result);
  }
}
