import { Request, Response } from "express";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { CreatePatientUseCase } from "./create-patient.usecase";

import { z } from "zod";
import { validatorSchema } from "../../../../infra/shared/validator/zod";
import { IPatientRepository } from "../../repositories/patient.repository";

export class CreatePatientController {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly patientRepository: IPatientRepository
  ) {}
  async handle(request: Request, response: Response) {
    const { body } = request;
    const createPatientUseCase = new CreatePatientUseCase(
      this.userRepository,
      this.patientRepository
    );
    const patientCreated = await createPatientUseCase.execute(body);
    response.json(patientCreated);
  }
}
