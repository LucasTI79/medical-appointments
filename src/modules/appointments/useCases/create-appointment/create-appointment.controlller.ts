import { Request, Response } from "express";
import { IMailProviver } from "../../../../infra/providers/mail/mail.provider";
import { IDoctorScheduleRepository } from "../../../doctor/repositories/doctor-schedule.repository";
import { IDoctorRepository } from "../../../doctor/repositories/doctor.repository";
import { IPatientRepository } from "../../../patient/repositories/patient.repository";
import { IAppointmentRepository } from "../../repositories/appointment.repository";
import { CreateAppointmentUseCase } from "./create-appointment.usecase";

export class CreateAppointmentController {
  constructor(
    private patientRepository: IPatientRepository,
    private doctorRepository: IDoctorRepository,
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository,
    private mailProvider: IMailProviver
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    const createAppointmentUseCase = new CreateAppointmentUseCase(
      this.patientRepository,
      this.doctorRepository,
      this.doctorScheduleRepository,
      this.appointmentRepository,
      this.mailProvider
    );
    await createAppointmentUseCase.execute(request.body, request.userId);
    response.status(201).end();
  }
}
