import { Request, response, Response } from "express";
import { CreateUserUseCase } from "./create-user.usecase";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const data = req.body;
    const useCase = new CreateUserUseCase();
    const result = useCase.execute(data);
    return response.json(result);
  }
}
