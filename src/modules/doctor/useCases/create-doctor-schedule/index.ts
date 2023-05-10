import { DoctorSchedulePrismaRepository } from "../../repositories/implementations/prisma/doctor-schedule.prisma.repository";
import { DoctorPrismaRepository } from "../../repositories/implementations/prisma/doctor.prisma.repository";
import { CreateDoctorScheduleController } from "./create-doctor-schedule.controller";

const doctorRepository = new DoctorPrismaRepository();
const doctorScheduleRepository = new DoctorSchedulePrismaRepository();
const createDoctorScheduleController = new CreateDoctorScheduleController(
  doctorRepository,
  doctorScheduleRepository
);

export { createDoctorScheduleController };
