import { Request, Response } from "express";
import { IDoctorScheduleRepository } from "../../repositories/doctor-schedule.repository";
import { IDoctorRepository } from "../../repositories/doctor.repository";
import { CreateDoctorScheduleUseCase } from "./create-doctor-schedule.usecase";

export class CreateDoctorScheduleController {
  constructor(
    private readonly doctorRepository: IDoctorRepository,
    private readonly doctorScheduleRepository: IDoctorScheduleRepository
  ) {}

  async handle(request: Request, response: Response) {
    const createDoctorInfoUseCase = new CreateDoctorScheduleUseCase(
      this.doctorRepository,
      this.doctorScheduleRepository
    );
    await createDoctorInfoUseCase.execute(request.body, request.userId);
    response.status(201).end();
  }
}
