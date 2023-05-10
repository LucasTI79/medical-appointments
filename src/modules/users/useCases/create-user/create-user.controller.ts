import { Request, Response } from "express";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { IUserRepository } from "../../repositories/user.repository";
import { CreateUserUseCase } from "./create-user.usecase";

export class CreateUserController {
  constructor(private readonly userRepository: IUserRepository) {}
  async handle(request: Request, response: Response) {
    const data = request.body;
    const useCase = new CreateUserUseCase(this.userRepository);
    const result = useCase.execute(data);
    return response.json(result);
  }
}
