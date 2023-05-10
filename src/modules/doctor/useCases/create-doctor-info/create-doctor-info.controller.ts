import { Request, Response } from "express";
import { IDoctorInfoRepository } from "../../repositories/doctor-info.repository";
import { IDoctorRepository } from "../../repositories/doctor.repository";
import { CreateDoctorInfoUseCase } from "./create-doctor-info.usecase";

export class CreateDoctorInfoController {
  constructor(
    private readonly doctorRepository: IDoctorRepository,
    private readonly doctorInfoRepository: IDoctorInfoRepository
  ) {}

  async handle(request: Request, response: Response) {
    const { body, userId } = request;
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      this.doctorRepository,
      this.doctorInfoRepository
    );
    const doctorCreated = await createDoctorInfoUseCase.execute(body, userId);
    response.json(doctorCreated);
  }
}
