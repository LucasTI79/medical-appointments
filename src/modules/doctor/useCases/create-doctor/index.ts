import { SpecialityPrismaRepository } from "../../../speciality/repositories/implementations/speciality.prisma.repository";
import { UserPrismaRepository } from "../../../users/repositories/implementations/user.prisma.repository";
import { DoctorPrismaRepository } from "../../repositories/implementations/prisma/doctor.prisma.repository";
import { CreateDoctorController } from "./create-doctor.controller";

const doctorPrismaRepository = new DoctorPrismaRepository();
const userPrismaRepository = new UserPrismaRepository();
const specialityPrismaRepository = new SpecialityPrismaRepository();
const createDoctorController = new CreateDoctorController(
  doctorPrismaRepository,
  userPrismaRepository,
  specialityPrismaRepository
);
export { createDoctorController };
