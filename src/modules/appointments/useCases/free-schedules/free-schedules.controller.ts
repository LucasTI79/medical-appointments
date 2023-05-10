import { Request, Response } from "express";
import { IDoctorScheduleRepository } from "../../../doctor/repositories/doctor-schedule.repository";
import { IAppointmentRepository } from "../../repositories/appointment.repository";
import { FreeScheduleUseCase } from "./free-schedules.usecase";

export class FreeSchedulesController {
  constructor(
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentsRepository: IAppointmentRepository
  ) {}
  async handle(request: Request, response: Response): Promise<void> {
    const freeScheduleUseCase = new FreeScheduleUseCase(
      this.doctorScheduleRepository,
      this.appointmentsRepository
    );
    const freeSchedules = await freeScheduleUseCase.execute(request.body);
    response.json(freeSchedules);
  }
}
