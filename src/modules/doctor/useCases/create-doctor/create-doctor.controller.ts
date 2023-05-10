import { Request, Response } from "express";
import { ISpecialityRepository } from "../../../speciality/repositories/speciality.repository";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { IDoctorRepository } from "../../repositories/doctor.repository";
import { CreateDoctorUseCase, CreateDoctorRequest } from "./create-doctor.usecase";

import { z } from "zod";
import { validatorSchema } from "../../../../infra/shared/validator/zod";

export class CreateDoctorController {
  constructor(
    private doctorRepository: IDoctorRepository,
    private readonly userRepository: IUserRepository,
    private readonly specialistRepository: ISpecialityRepository
  ) {}
  async handle(request: Request, response: Response) {
    const { body } = request;

    const doctorSchema = z.object({
      username: z.string(),
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      crm: z.string().length(6, "CRM must contain six characters"),
      specialityId: z.string().uuid({
        message: "You need to insert a valid speciality ID",
      }),
    });

    validatorSchema<CreateDoctorRequest>(doctorSchema, body);

    const createDoctorUseCase = new CreateDoctorUseCase(
      this.doctorRepository,
      this.userRepository,
      this.specialistRepository
    );
    const doctorCreated = await createDoctorUseCase.execute(body);
    response.json(doctorCreated);
  }
}
