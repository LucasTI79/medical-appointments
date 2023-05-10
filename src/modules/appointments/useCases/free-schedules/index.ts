import { DoctorSchedulePrismaRepository } from "../../../doctor/repositories/implementations/prisma/doctor-schedule.prisma.repository";
import { AppointmentPrismaRepository } from "../../repositories/implementations/prisma/appointment.prisma.repository";
import { FreeSchedulesController } from "./free-schedules.controller";

const doctorScheduleRepository = new DoctorSchedulePrismaRepository();
const appointmentRepository = new AppointmentPrismaRepository();
const freeScheduleController = new FreeSchedulesController(
  doctorScheduleRepository,
  appointmentRepository
);

export { freeScheduleController };
